import React, { useRef } from "react";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useCRContext } from "./context";
import { Input } from "./ui/input";
import { chatSession } from "@/lib/gemini";

export default function GenerateReviewData() {
  const {
    job,
    setJob,
    customerName,
    setCustomerName,
    result,
    setResult,
    setisLoading,
    isLoading,
  } = useCRContext();

  const textareaRef = useRef(null);

  // Handle textarea input and adjust height dynamically
  const jobTextAreaInputChangeHandler = (event) => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;

    setJob(event.target.value);
  };

  // Handle customer's name input
  const customerNameInputChangeHandler = (event) => {
    setCustomerName(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setisLoading(true); // Show loading state

    const structure = {
      email_format: [
        {
          subject: "",
          body: "",
          rating_links: {
            link1: "",
            link2: "",
          },
        },
        {
          subject: "",
          body: "",
          rating_links: {
            link1: "",
            link2: "",
          },
        },
      ],
      review: ["", "", "", "", "", "", "", "", "", ""],
    };

    const queryPrompt = `I own a web design agency called Kloud Construct, I want to get customers' feedback on the service rendered. Generate 2 different emails automatically that I can paste into Gmail and send. Include the rating links, some boilerplate text "thanks for your business, please rate your service, etc." Personalize the text based on the person's name, which is "${customerName}", and the service provided: "${job}"    and craft 10 positive reviews under mininium of 50 words. The response should be in JSON format with 'email_format' and 'review'. when i have parsed the json, this must always be the structure: ${structure} for the key`;

    try {
      const result = await chatSession.sendMessage(queryPrompt);
      const data = await result.response.text();

      setResult(data);
      setCustomerName("");
      setJob("");
    } catch (error) {
      console.error("Error generating review data:", error);
    } finally {
      setisLoading(false);
    }
  };

  return (
    <section className="h-[20vh]">
      <form
        className="flex flex-col w-full justify-center px-6 gap-1.5"
        onSubmit={submitHandler}>
        <Label htmlFor="customer-name">Customer's Name?</Label>
        <Input
          id="customer-name"
          placeholder="Kevin Ben"
          required
          value={customerName}
          onChange={customerNameInputChangeHandler}
        />

        <Label htmlFor="job">What Job Was Done?</Label>
        <Textarea
          id="job"
          required
          placeholder="Type the job here."
          ref={textareaRef}
          value={job}
          onChange={jobTextAreaInputChangeHandler}
        />

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Generating..." : "Generate Email"}
        </Button>
      </form>
    </section>
  );
}
