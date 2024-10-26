import React, { useState, useEffect, Fragment } from "react";
import SoundList from "components/SoundsPage/SoundList";
import Spinner from "icons/Spinner";
import TagList from "components/SoundsPage/TagList";
import Button from "components/Button";
import PopupDialog from "components/PopupDialog";
import TextInput from "components/TextInput";
import TagComboBox from "components/SoundsPage/TagComboBox";
import FilePicker from "components/FilePicker";
import CurrencyInput from "components/CurrencyInput";

const baseUrl = "https://localhost:52358/api";

export default function SoundsPage() {

  const [sounds,          setSounds]          = useState([]);
  const [tags,            setTags]            = useState([]);
  const [selectedTagId,   setSelectedTagId]   = useState();
  const [tagsAreLoaded,   setTagsAreLoaded]   = useState(false);
  const [soundsAreLoaded, setSoundsAreLoaded] = useState(false);

  const [tagDialogIsOpen, setTagDialogIsOpen] = useState(false);

  const [addSoundDialogIsOpen, setAddSoundDialogIsOpen] = useState(false);
  const [selectedTagsToAdd, setSelectedTagsToAdd] = useState([]);
  const [file, setFile] = useState();

  const fetchSounds = async (tagId) => {
    const url = (tagId === undefined) ? `${baseUrl}/sounds` : `${baseUrl}/sounds?tagId=${tagId}`;
    console.log(`fetching ${url}`);
    try {
      const response = await fetch(url);
      if (response.ok === false) { throw Error(response.status); }
      const body = await response.json();
      setSoundsAreLoaded(true);
      setSounds(body.sounds);
    }
    catch (error) {
      console.log("error", error);
    }
  };

  const fetchTags = async () => {
    try {
      const response = await fetch(`${baseUrl}/tags`);
      if (response.ok === false) { throw Error(response.status); }
      const body = await response.json();
      setTagsAreLoaded(true);
      setTags(body.tags);
    }
    catch (error) {
      console.log("error", error);
    }
  };

  const addTag = (event) => {
    event.preventDefault();
    fetch(`${baseUrl}/tags`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        "name": event.target["name"].value,
        "rank": event.target["rank"].value || null
      }),
    })
      .then(function(response) {
        console.log(response);
        // TODO: Confirmation?
      })
      .catch(function(error) {
        console.error(error);
        alert(error);
      });

    fetchTags();
    return;
  };

  const addSound = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", event.target.title.value);
    formData.append("priceInPence", event.target.price.value * 100);
    formData.append("rank", event.target.rank.value);
    formData.append("description", event.target.description.value);
    formData.append("file", file);
    for (var i = 0; i < selectedTagsToAdd.length; i++) {
      formData.append("arr[]", selectedTagsToAdd[i]);
    }

    fetch(`${baseUrl}/sounds`, {
      method: "POST",
      body: formData
    })
      .then(function(response) {
        console.log(response);
        // TODO: Confirmation?
      })
      .catch(function(error) {
        console.error(error);
        alert(error);
      });

    setAddSoundDialogIsOpen(false);
    fetchSounds(selectedTagId);
    return;
  };

  useEffect(() => {
    fetchSounds();
    fetchTags();
  }, []);

  useEffect(() => {
    fetchSounds(selectedTagId);
  }, [selectedTagId]);

  return <>
    {(!tagsAreLoaded || !soundsAreLoaded) && <Spinner />}
    {tagsAreLoaded && soundsAreLoaded && <>
      <TagList
        tags={tags}
        selectedTagId={selectedTagId}
        setSelectedTagId={setSelectedTagId}
        handleAddTagClick={() => setTagDialogIsOpen(true)}
      />
      <SoundList
        sounds={sounds}
        handleAddSoundClick={() => setAddSoundDialogIsOpen(true)}
      />
    </>}

    <PopupDialog isOpen={tagDialogIsOpen} onClose={() => setTagDialogIsOpen(false)}>
      <form onSubmit={addTag} className="flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <TextInput id="name" label="Name" placeholder="Ambient" required />
          <TextInput id="rank" label="Rank" placeholder="50" pattern="^[0-9]*$" required />
        </div>
        <div className="flex w-auto gap-2 justify-between">
          <Button type="button" style="secondary" onClick={() => setTagDialogIsOpen(false)}>
            Cancel
          </Button>
          <Button type="submit">
            Add Tag
          </Button>
        </div>
      </form>
    </PopupDialog>

    <PopupDialog isOpen={addSoundDialogIsOpen} onClose={() => setAddSoundDialogIsOpen(false)}>
      <form onSubmit={addSound} encType="multipart/form-data" className="flex flex-col gap-4 text-fg">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <TextInput id="title" label="Title" placeholder="Cool Jamz" required />
          <CurrencyInput id="price" label="Price" required/>
          <TextInput id="rank" label="Rank" placeholder="50" pattern='^[0-9]*$' />
          <FilePicker id="file" required setFile={setFile} />
          <TagComboBox
            possibleValues={tags}
            selectedTagsToAdd={selectedTagsToAdd}
            setSelectedTagsToAdd={setSelectedTagsToAdd}
          />
          <TextInput id="description" label="Description" cols={3} className="col-span-2" />

        </div>
        <div className="flex w-auto gap-2 justify-between">
          <Button type="button" style="secondary" onClick={() => setAddSoundDialogIsOpen(false)}>
            Cancel
          </Button>
          <Button type="submit">
            Add Sound
          </Button>
        </div>
      </form>
    </PopupDialog>
  </>;
}
