------------------------------------------------ SCHEMA ------------------------------------------------
SET DATEFORMAT ymd;

USE master;

IF NOT EXISTS(SELECT * FROM sys.databases WHERE name = 'SoundStore')
	BEGIN
		CREATE DATABASE SoundStore;
	END
GO

USE SoundStore;

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

------------------------------------------------ IDEAS / ARCHIVE ------------------------------------------------
/*

*/