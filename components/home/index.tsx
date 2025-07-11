"use client";
import { useState, Fragment } from "react";
import InputField from "../input";
import { ToastContainer, toast, Bounce } from "react-toastify";
import Swal from "sweetalert2";

enum RiskEnum {
  low,
  medium,
  high,
}

const HomePageComponent = () => {
  const [age, setAge] = useState<string>("");
  const [income, setIncome] = useState<string>("");
  const [dependents, setDependents] = useState<string>("");
  const riskList = ["low", "medium", "high"];
  // Low / Medium / High
  const [risk, setRisk] = useState<string>(riskList[0]);

  const handleChangeAge = (value: string) => {
    //ensure that only numbers can be added to this input.
    // the number should not be negative and not greater than 150
    const numberPattern = /\d+/g;
    const newValue = value.match(numberPattern)?.join("");
    if (!newValue) {
      setAge("");
      return;
    }

    if (parseInt(newValue) > 0 && parseInt(newValue) < 150) {
      setAge(value);
    }
  };
  const handleChangeIncome = (value: string) => {
    //ensure that only numbers can be added to this input.
    // the number should not be negative and not greater than 150
    const numberPattern = /\d+/g;
    const newValue = value.match(numberPattern)?.join("");
    if (!newValue) {
      setIncome("");
      return;
    }

    if (parseInt(newValue) > 0) {
      setIncome(value);
    }
  };
  const handleChangeDependents = (value: string) => {
    //ensure that only numbers can be added to this input.
    // the number should not be negative and not greater than 150
    const numberPattern = /\d+/g;
    const newValue = value.match(numberPattern)?.join("");
    if (!newValue) {
      setDependents("");
      return;
    }

    if (parseInt(newValue) > 0) {
      setDependents(value);
    }
  };
  const handleSubmit = () => {
    if (
      !age ||
      !parseInt(age) ||
      parseInt(dependents) < 0 ||
      parseInt(dependents) > 150
    ) {
      toast.error("Age is required", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });

      return;
    }
    if (!income || !parseInt(income) || parseInt(dependents) < 0) {
      toast.error("Income is required", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });

      return;
    }
    if (!dependents || !parseInt(dependents) || parseInt(dependents) < 0) {
      toast.error("Number of Dependents is required", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });

      return;
    }
    if (!risk || !riskList.includes(risk)) {
      toast.error("Risk Tolerance is required", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });

      return;
    }
    const payload = {
      risk,
      age,
      dependents,
      income,
    };
    try {
      Swal.fire({
        title: "Success!",
        text: "Term Life – $500,000 for 20 years",
        icon: "success",
      });

      setAge("");
      setRisk(riskList[0]);
      setDependents("");
      setIncome("");
    } catch (err) {
      Swal.fire({
        title: "Error!",
        text: "Something Went Wrong!",
        icon: "error",
      });
    }
  };

  return (
    <main className="container ">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        aria-label="toast"
        transition={Bounce}
      />
      <h1 className="text-black text-center text-lg md:text-2xl">
        <b>Fill In the form to get a personalized recommendation</b>
      </h1>
      <div className="grid grid-col-1  md:grid-col-2  gap-4 mt-4 px-4">
        <div className="flex flex-col md:flex-row gap-2">
          <InputField
            value={dependents}
            setValue={handleChangeDependents}
            title="Number of Dependents"
          />

          <InputField
            value={income}
            setValue={handleChangeIncome}
            title="Income"
          />
        </div>
        <div className="flex flex-col md:flex-row gap-2">
          <InputField value={age} setValue={handleChangeAge} title="Age" />
          <div className="flex flex-col w-full gap-2">
            <label title="age" className="text-black ">
              Risk Tolerance
            </label>
            <select
              className="border border-gray-400 text-black rounded-lg py-2 w-full md:w-3/4 px-2"
              value={risk}
              onChange={(value) => {
                setRisk(value.target.value);
              }}
            >
              {riskList.map((riskItem) => (
                <option value={riskItem} className="capitalize" key={riskItem}>
                  {riskItem}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex justify-center items-center ">
          <button
            className="bg-blue-500 border rounded-lg px-4 py-2"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </main>
  );
};

export default HomePageComponent;
