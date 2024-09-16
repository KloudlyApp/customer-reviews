import { Copy } from "lucide-react";
import React, { useState, useEffect } from "react";

function DisplayData({ data }) {
  const [parsedData, setParsedData] = useState(null);

  useEffect(() => {
    // Parse the data when the component mounts or `data` changes
    try {
      const parsed = JSON.parse(data);
      setParsedData(parsed);
    } catch (error) {
      console.error("Error parsing JSON data:", error);
    }
  }, [data]);

  if (!parsedData) {
    return <p>Loading...</p>;
  }

  const { email_format, review } = parsedData;

  console.log({ parsedData });

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      () => alert("Copied to clipboard!"),
      (err) => console.error("Failed to copy: ", err)
    );
  };

  return (
    <section className="p-4">
      <h2 className="text-xl font-bold mb-4">Generated Emails</h2>
      {email_format?.length > 0 ? (
        email_format.map((email, index) => (
          <div key={index} className="mb-4 p-4 border rounded-lg">
            <div className=" flex mb-4">
              <h3 className="text-lg font-semibold">{email.subject}</h3>
              <Copy
                onClick={() => copyToClipboard(email.subject)}
                className="ml-2 cursor-pointer text-blue-500"
                title="Copy subject"
              />
            </div>

            <div className="flex justify-between">
              <p className="w-[80%]">{email.body}</p>
              <Copy
                onClick={() => copyToClipboard(email.body)}
                className="ml-2 cursor-pointer text-blue-500"
                title="Copy body"
              />
            </div>

            {email.rating_link_1 && (
              <a href={email.rating_link_1} className="text-blue-500">
                {email.rating_link_1}
              </a>
            )}
            {email.rating_link_2 && (
              <a href={email.rating_link_2} className="text-blue-500">
                {email.rating_link_2}
              </a>
            )}
          </div>
        ))
      ) : (
        <p>No emails generated.</p>
      )}

      

      <h2 className="text-xl font-bold mb-4">Positive Reviews</h2>
      {review.length > 0 ? (
        review?.map((item, index) => (
          <blockquote
            key={index}
            className="mb-4 p-4 border-l-4 border-green-500 bg-green-50">
            <p>
              <Copy
                onClick={() => copyToClipboard(item)}
                className="ml-2 cursor-pointer text-green-500 mb-4"
                title="Copy positive review"
              />
              {item}
            </p>
          </blockquote>
        ))
      ) : (
        <p>No positive reviews available.</p>
      )}
    </section>
  );
}

export default DisplayData;
