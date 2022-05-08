SET DATEFORMAT ymd;

------------------------------------------------ SCHEMA ------------------------------------------------

USE master;

IF NOT EXISTS(SELECT * FROM sys.databases WHERE name = 'SoundStore')
	BEGIN
		CREATE DATABASE SoundStore;
	END
GO

USE SoundStore;

DROP PROCEDURE IF EXISTS dbo.CreateSound;
DROP PROCEDURE IF EXISTS dbo.ReadSounds;
DROP PROCEDURE IF EXISTS dbo.ReadSound;
DROP PROCEDURE IF EXISTS dbo.UpdateSound;
DROP PROCEDURE IF EXISTS dbo.DeleteSound;

DROP PROCEDURE IF EXISTS dbo.CreateTag;
DROP PROCEDURE IF EXISTS dbo.ReadTags; -- We could use a View for this, but ORDER BY isn't allowed in views.
DROP PROCEDURE IF EXISTS dbo.UpdateTag;
DROP PROCEDURE IF EXISTS dbo.DeleteTag;

DROP PROCEDURE IF EXISTS dbo.CreateSoundTag;
DROP PROCEDURE IF EXISTS dbo.ReadSoundTags;
DROP PROCEDURE IF EXISTS dbo.DeleteSoundTag;

DROP TABLE IF EXISTS dbo.SoundTag;
DROP TABLE IF EXISTS dbo.Sound;
DROP TABLE IF EXISTS dbo.Tag;
DROP TABLE IF EXISTS dbo.Comment;
DROP TABLE IF EXISTS dbo.[Message];
DROP TABLE IF EXISTS dbo.[Order];
DROP TABLE IF EXISTS dbo.SoundVersion;
DROP TABLE IF EXISTS dbo.Person;

CREATE TABLE Sound (
		[Id]			UniqueIdentifier NOT NULL	PRIMARY KEY -- GUID's don't allow IDENTITY. Id's will be generated in the sprocs instead.
	,	[CreatedOn]		Datetime2(0)	 NOT NULL	
	,	[Title]			Varchar(40)	     NOT NULL	
	,	[Description]	Varchar(4000)	 NULL
	,   [DurationSecs]	TinyInt	         NULL	
    ,   [PriceGBP]      Decimal(4,2)     NULL
	,	[Preview] 		Varchar(255)	 NULL	
	,	[Picture]		Varchar(255)	 NULL
	,   [Structure]		Varchar(40)		 NULL
);

CREATE TABLE Tag (
		[Id]			SmallInt		 NOT NULL   IDENTITY PRIMARY KEY
	,	[Name]			Varchar(40)	     NOT NULL	
	,   [Popularity]    TinyInt			 NULL -- 0 to 255.
);

CREATE TABLE SoundTag (
		[SoundId]		UniqueIdentifier NOT NULL	FOREIGN KEY REFERENCES Sound(Id)
	,	[TagId]			SmallInt	     NOT NULL	FOREIGN KEY REFERENCES Tag(Id)
													PRIMARY KEY (SoundId, TagId) -- Composite key.
);
GO

------------------------------------------------ SPROCS  ------------------------------------------------

CREATE OR ALTER PROCEDURE CreateTag
		@Id			SmallInt	= NULL OUTPUT
	,	@Name		Varchar(40)
	,   @Popularity TinyInt		= NULL -- 0 to 255.
AS
BEGIN
	SET NOCOUNT ON -- TODO: Does it cost processing power to switch this on and off? Can I leave it off?
	SET XACT_ABORT ON
	BEGIN TRANSACTION

		INSERT INTO Tag ( [Name], [Popularity] )
		VALUES			( @Name,  @Popularity  )

		SET @Id = SCOPE_IDENTITY()
		DECLARE @rc TinyInt = @@ROWCOUNT;

		IF (@rc = 1)
			COMMIT TRANSACTION
		ELSE
			ROLLBACK TRANSACTION

	SET NOCOUNT OFF
END
GO

CREATE OR ALTER PROCEDURE ReadTags AS -- Todo: Return aggregate count of sounds linked to each tag.
	SELECT [Id], [Name], [Popularity]
	FROM Tag
	ORDER BY [Popularity]
GO

CREATE OR ALTER PROCEDURE UpdateTag
		@Id			SmallInt
	,	@Name		Varchar(40)
	,   @Popularity TinyInt		= NULL
AS
BEGIN
	SET NOCOUNT ON
	SET XACT_ABORT ON
	BEGIN TRANSACTION

		UPDATE Tag
		SET [Name] = @Name,	[Popularity] = @Popularity
		WHERE Id = @Id

	COMMIT TRANSACTION
	SET NOCOUNT OFF
END
GO

CREATE OR ALTER PROCEDURE DeleteTag -- TODO: DeleteTag should cascade delete to SoundTag
	@Id SmallInt
AS
BEGIN
	SET XACT_ABORT ON
	BEGIN TRANSACTION

	DELETE FROM Tag
	WHERE Id = @Id

	DECLARE @rc TinyInt = @@ROWCOUNT;

	IF (@rc = 1)
		COMMIT TRANSACTION
	ELSE
		ROLLBACK TRANSACTION
END
GO

CREATE OR ALTER PROCEDURE CreateSound -- TODO: Add IsPublished attribute so a sound can be worked on before it's made public.
		@CreatedOn		Datetime2(0)     = NULL	
	,	@Title			Varchar(40)
	,	@Description	Varchar(4000)    = NULL
	,   @DurationSecs	TinyInt	         = NULL
    ,   @PriceGBP		Decimal(4,2)     = NULL
	,	@Preview 		Varchar(255)     = NULL	
	,	@Picture		Varchar(255)     = NULL
	,   @Structure		Varchar(40)		 = NULL
	,	@Id				UniqueIdentifier = NULL	OUTPUT
AS
BEGIN
	SET NOCOUNT ON
	SET XACT_ABORT ON
	BEGIN TRANSACTION

		IF (@CreatedOn IS NULL)
		BEGIN
			SET @CreatedOn = GETDATE()
		END

		SET @Id = NEWID();

		INSERT INTO Sound ( [Id], [CreatedOn], [Title], [Description], [DurationSecs], [PriceGBP], [Preview], [Picture], [Structure] )
		VALUES			  ( @Id,  @CreatedOn,  @Title,  @Description,  @DurationSecs,  @PriceGBP,  @Preview,  @Picture,  @Structure  )

		DECLARE @rc TinyInt = @@ROWCOUNT;

		IF (@rc <> 1)
			ROLLBACK TRANSACTION
		ELSE
			COMMIT TRANSACTION

	SET NOCOUNT OFF
END
GO

CREATE OR ALTER PROCEDURE ReadSounds
	@TagId	SmallInt = NULL	-- Optional, returns all if null.
AS

	IF (@TagId IS NULL)
	BEGIN
		SELECT [Id], [CreatedOn], [Title], [DurationSecs], [Preview], [Picture]
		FROM Sound -- With the GetAll() method used on the List All page, not all fields need to be displayed. TODO: Make a seperate Dto for this.
	END
	ELSE -- TODO: Test that there is no conflict in EF... it might be confused when it sees 2 SELECT statements.
	BEGIN
		SELECT [Id], [CreatedOn], [Title], [DurationSecs], [Preview], [Picture]
		FROM Sound s
		INNER JOIN SoundTag st ON st.SoundId = s.Id
		WHERE st.TagId = @TagId
	END
GO

CREATE OR ALTER PROCEDURE ReadSound -- This one returns more fields.
	@Id	UniqueIdentifier
AS
BEGIN
	SELECT * FROM Sound
	WHERE ([Id] = @Id)
END
GO

CREATE OR ALTER PROCEDURE UpdateSound
		@Id				UniqueIdentifier
	,	@CreatedOn		Datetime2(0)     = NULL	
	,	@Title			Varchar(40)
	,	@Description	Varchar(4000)    = NULL
	,   @DurationSecs	TinyInt	         = NULL
    ,   @PriceGBP		Decimal(4,2)     = NULL
	,	@Preview 		Varchar(255)     = NULL	
	,	@Picture		Varchar(255)     = NULL
	,   @Structure		Varchar(40)		 = NULL
AS
BEGIN
	SET NOCOUNT ON
	SET XACT_ABORT ON -- Roll back transaction if a T-SQL statement raises a run-time error.
	BEGIN TRANSACTION

	IF (@CreatedOn IS NULL)
	BEGIN
		SET @CreatedOn = GETDATE()
	END

		UPDATE Sound
		SET [CreatedOn]    = @CreatedOn
		,	[Title]        = @Title
		,	[Description]  = @Description
		,	[DurationSecs] = @DurationSecs
		,	[PriceGBP]     = @PriceGBP
		,	[Preview]      = @Preview
		,	[Picture]      = @Picture
		,	[Structure]    = @Structure
		WHERE Id = @Id

	COMMIT TRANSACTION
	SET NOCOUNT OFF
END
GO

CREATE OR ALTER PROCEDURE DeleteSound -- TODO: DeleteSound should cascade delete to SoundTag
	@Id UniqueIdentifier
AS
BEGIN
	SET XACT_ABORT ON
	BEGIN TRANSACTION

	DELETE FROM Sound
	WHERE Id = @Id

	DECLARE @rc TinyInt = @@ROWCOUNT;

	IF (@rc = 1)
		COMMIT TRANSACTION
	ELSE
		ROLLBACK TRANSACTION
END
GO

EXEC DeleteSound @Id = '59109C55-A12C-4258-92D2-D04476F4117D';
GO

CREATE OR ALTER PROCEDURE CreateSoundTag
		@SoundId	UniqueIdentifier
	,	@TagId		SmallInt
AS
BEGIN
	SET NOCOUNT ON
	SET XACT_ABORT ON
	BEGIN TRANSACTION

		INSERT INTO SoundTag ( [SoundId], [TagId] )
		VALUES			     ( @SoundId,  @TagId  )

		DECLARE @rc TinyInt = @@ROWCOUNT;

		IF (@rc = 1)
			COMMIT TRANSACTION
		ELSE
			ROLLBACK TRANSACTION

	SET NOCOUNT OFF
END
GO

CREATE OR ALTER PROCEDURE ReadSoundTags
	@SoundId UniqueIdentifier
AS
BEGIN
	SELECT st.[TagId], t.[Name], t.[Popularity]
	FROM SoundTag st
	INNER JOIN Tag t
	ON st.[TagId] = t.[Id]
	ORDER BY t.[Popularity]
END
GO

CREATE OR ALTER PROCEDURE DeleteSoundTag
		@SoundId UniqueIdentifier
	,	@TagId   SmallInt
AS
BEGIN
	SET XACT_ABORT ON
	BEGIN TRANSACTION

	DELETE FROM SoundTag
	WHERE [SoundId] = @SoundId AND [TagId] = @TagId;

	DECLARE @rc TinyInt = @@ROWCOUNT;

	IF (@rc = 1)
		COMMIT TRANSACTION
	ELSE
		ROLLBACK TRANSACTION
END
GO

------------------------------------------------ TESTS ------------------------------------------------

EXEC CreateTag @Name = 'Cinematic',  @Popularity = 120;
EXEC CreateTag @Name = 'Hiphop',     @Popularity = 150;
EXEC CreateTag @Name = 'Dark',       @Popularity = 140;
EXEC CreateTag @Name = 'Advert',     @Popularity = 130;
EXEC CreateTag @Name = 'Game Music', @Popularity = 100;
EXEC CreateTag @Name = 'Uplifting',  @Popularity = 110;
EXEC CreateTag @Name = 'Lofi',       @Popularity = 160;
EXEC CreateTag @Name = 'Ambient',    @Popularity = 105;
EXEC CreateTag @Name = 'ToDelete',   @Popularity = 50;
GO

EXEC ReadTags;
GO

EXEC UpdateTag @Id = 9, @Name = 'ToDeleteUpdated', @Popularity = 60;
GO

EXEC DeleteTag @Id = 9;
GO

EXEC CreateSound @Title = 'Test 1',      @Description = 'Test 1 Description', @DurationSecs = 100, @PriceGBP = 20.00, @Preview = 'https://cdn.net/mp3/hx8ek3xp9', @Picture = 'https://photos.com/ah7xiekx8', @Structure = 'ABACA';
EXEC CreateSound @Title = 'Guitar',      @Description = 'Lovely plucked guitar sample', @CreatedOn = '2020-12-13' -- CreatedOn specified
EXEC CreateSound @Title = 'Drum beat',   @Description = 'Boom pow bam ti bosh' -- Auto CreatedOn
DECLARE @IdOutput UniqueIdentifier;
EXEC CreateSound @Title = 'Ocean Waves', @Description = 'Soothing, relaxing', @Id = @IdOutput OUTPUT; -- Test that Id gets outputted
PRINT @IdOutput
GO -- TODO: Reorder attributes - most important/used first.

EXEC UpdateSound @Id = '59109C55-A12C-4258-92D2-D04476F4117D', @CreatedOn = '2016-12-13', @Title = 'Test 1 Updated', @DurationSecs = 101, @Preview = 'https://cdn.net/mp3/hx8ek3xp9', @Picture = 'https://photos.com/ah7xiekx8';
GO

EXEC ReadSounds;
GO

EXEC ReadSound @Id = '59109C55-A12C-4258-92D2-D04476F4117D';
GO

EXEC CreateSoundTag @SoundId = '59109C55-A12C-4258-92D2-D04476F4117D', @TagId = 8;
EXEC CreateSoundTag @SoundId = '59109C55-A12C-4258-92D2-D04476F4117D', @TagId = 6;
GO

EXEC ReadSoundTags @SoundId = '59109C55-A12C-4258-92D2-D04476F4117D';
GO

EXEC DeleteSoundTag @SoundId = 'B1473949-88D0-4833-BD66-99A4F0BBD43B', @TagId = 6;
GO

------------------------------------------------ IDEAS / ARCHIVE ------------------------------------------------
/*

*/
