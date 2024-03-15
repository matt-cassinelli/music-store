"use client";
import { useForm, ValidationError } from "@formspree/react";
import Link from "next/link";
import { CheckIcon } from "@heroicons/react/24/solid";

export default function Contact() {
  const [state, handleSubmit] = useForm("xrgwbgqw");

  // [dbg] state.succeeded = true;

  if (state.succeeded) {
    return (
      <section className="flex gap-3 mx-auto w-full max-w-lg rounded-2xl p-6 align-middle shadow-xl">
        <CheckIcon className="w-6 h-6 text-palette-brand shrink-0"/>
        <p>Thanks for your enquiry, we&#39;ll get back to you shortly!</p>
      </section>
    );
  }

  // function handleSubmit(event) {
  //   event.preventDefault();

  //   let formData = new FormData();
  //   formData.append('name', name);
  //   formData.append('email', email);
  //   formData.append('message', message);

  //   fetch("/", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/x-www-form-urlencoded" },
  //     body: new URLSearchParams(formData).toString(),
  //   })
  //     .then(() => setModalIsOpen(true))
  //     .catch((error) => alert(error));

  //   setModalIsOpen(true)
  //   console.log(`${name} (${email}) submitted an enquiry: ${message}`);
  // }

  // function handleClose(event) {
  //   <Link href="/" scroll={false}>
  // }

  return (<>

    <form name='contact' id='contact' className="w-full px-4 mx-auto max-w-2xl" onSubmit={handleSubmit}>

      <label className="label label-text pt-0" htmlFor="name">
          What is your name?
      </label>
      <input
        className="form-input input input-bordered w-full focus:outline-none placeholder-gray-300"
        id="name"
        type="text"
        name="name"
        placeholder="John Doe"
        required
        // onChange={(e) => setName(e.target.value)}
      />
      <ValidationError
        prefix="Name"
        field="name"
        errors={state.errors}
      />

      <label className="label label-text mt-6" htmlFor="name">
          Your email
      </label>
      <input
        className="form-input input input-bordered w-full focus:outline-none placeholder-gray-300"
        id="email"
        type="email"
        name="email"
        placeholder="johndoe@acme.com"
        required
        // onChange={(e) => setEmail(e.target.value)}
      />
      <ValidationError
        prefix="Email"
        field="email"
        errors={state.errors}
      />

      <label className="label label-text mt-6" htmlFor="message">
          Your enquiry
      </label>
      <textarea
        className="textarea textarea-bordered w-full focus:outline-none"
        id="message"
        name="message"
        rows="5"
        required
        // onChange={(e) => setMessage(e.target.value)}
      />
      <ValidationError
        prefix="Message"
        field="message"
        errors={state.errors}
      />

      <div className="flex justify-between items-center mt-6">
        <button
          type='submit'
          disabled={state.submitting}
          className="btn btn-active btn-primary"
        >
            Submit
        </button>
        <p className="align-middle text-sm text-right">
            Alternatively, email us at <Link href={`mailto:${process.env.contactEmail}`} className='underline'>
            {process.env.contactEmail}
          </Link>
        </p>
      </div>
    </form>
  </>);
}
