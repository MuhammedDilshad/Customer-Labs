import React, { useState } from "react";
import SliderNav from "../SliderNav/SliderNav";
import { SaveData } from "../../api/segmentApi.js";

function Segment() {
  const [popup, setPopup] = useState(false);
  const [selectedSchema, setSelectedSchema] = useState("");
  const [schemas, setSchemas] = useState([]);
  console.log(schemas, "schemas");
  const [availableOptions, setAvailableOptions] = useState([
    "first_name",
    "last_name",
    "gender",
    "age",
    "account_name",
    "city",
    "state",
  ]);
  console.log(availableOptions, "availableOptions");

  const [segmentName, setSegmentName] = useState("");
  const [segmentNameError, setSegmentNameError] = useState("");

  const handlePopup = () => {
    setPopup((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "segment_name") {
      setSegmentName(value);
      if (value.trim() === "") {
        setSegmentNameError("Segment name cannot be empty");
      } else {
        setSegmentNameError("");
      }
    } else {
      setSelectedSchema(value);
    }
  };

  const handleChangeOne = (e, index) => {
    console.log(e.target.value, index, "event");
    const updatedStrings = [...schemas];
    updatedStrings[index] = e.target.value;
    setSchemas(updatedStrings);
    setAvailableOptions((prevOptions) =>
      prevOptions.filter((option) => option !== e.target.value)
    );
  };

  const handleAddSchema = () => {
    if (selectedSchema) {
      setSchemas([...schemas, selectedSchema]);
      // setSelectedSchema("");
      setAvailableOptions((prevOptions) =>
        prevOptions.filter((option) => option !== selectedSchema)
      );
    }
  };

  const resetState = () => {
    setSchemas([]);
    setSegmentName("");
    setSegmentNameError("");
    setAvailableOptions([
      "first_name",
      "last_name",
      "gender",
      "age",
      "account_name",
      "city",
      "state",
    ]);
  };

  const handleEdit = (indexToRemove) => {
    try {
      const updatedSchemas = schemas.filter(
        (schema, index) => index !== indexToRemove
      );
      setSchemas(updatedSchemas);
      setAvailableOptions((prevOptions) => [
        ...prevOptions,
        schemas[indexToRemove],
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = () => {
    try {
      if (segmentName.trim() === "") {
        setSegmentNameError("Segment name cannot be empty");
        return;
      }
      const schema = schemas.map((schemaItem) => {
        return { [schemaItem]: schemaItem };
      });
      const data = {
        segment_name: segmentName,
        schema: schema,
      };
      console.log(data, "api data");
      SaveData(data);

      resetState();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="">
      <div className={popup ? " ml-64 mt-64" : "mt-64 flex justify-center"}>
        <button
          onClick={handlePopup}
          className="rounded-lg p-4 cursor-pointer text-white bg-blue-500"
        >
          Save segment
        </button>
      </div>
      {popup ? (
        <div className="fixed right-0 top-0 bottom-0 w-1/2 bg-white text-black z-50 overflow-y-auto border">
          <SliderNav />
          <div className="flex flex-col p-8">
            <label className="text-xl" htmlFor="segmentName">
              Enter the name of the Segment
            </label>
            <input
              onChange={handleChange}
              name="segment_name"
              id="segmentName"
              className="rounded-lg border p-2 border-gray-600 text-gray-500 bg-white mt-4"
              type="text"
              placeholder="Name of the Segment"
              value={segmentName}
            />
            {segmentNameError && (
              <p className="text-red-500">{segmentNameError}</p>
            )}

            <strong>
              To save your segment, you need to add the schemas <br /> to build
              the query
            </strong>
          </div>
          {schemas.length > 0 && (
            <div className="flex flex-col justify-center mx-8 mb-8 gap-2 border">
              {schemas.map((schema, index) => (
                <div key={index} className=" gap-5 flex">
                  <select
                    id={`schema-${index}`}
                    name={`schema-${index}`}
                    className="rounded-lg border ml-5 p-4 w-3/4  border-gray-600 text-gray-500 bg-white"
                    value={schema}
                    onChange={(event) => handleChangeOne(event, index)}
                  >
                    <option value={schema}>{schema}</option>

                    {availableOptions.map((option) => (
                      <>
                        <option key={option} value={option}>
                          {option}
                        </option>
                      </>
                    ))}
                  </select>
                  <button
                    onClick={() => handleEdit(index)}
                    className="rounded-lg p-5 cursor-pointer text-white bg-gray-500"
                  >
                    -
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="pl-8">
            <div>
              <select
                id="schema"
                name="schema"
                className="rounded-lg border p-4 border-gray-600 text-gray-500 bg-white"
                value={selectedSchema}
                onChange={(event) => handleChange(event)}
              >
                <option value="">Add schema to segment</option>
                {availableOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-8">
              <button
                onClick={handleAddSchema}
                className="text-blue-500 underline hover:text-blue-700 ml-2"
              >
                + Add new schema
              </button>
            </div>
          </div>
          <div className="flex gap-5 ml-8 mt-5 ">
            <button
              onClick={handleSubmit}
              className="rounded-lg p-4 cursor-pointer text-white bg-green-500"
            >
              save the segment
            </button>
            <button className="rounded-lg p-4 cursor-pointer text-white bg-blue-500">
              cancel
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Segment;
