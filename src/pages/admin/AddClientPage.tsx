import { useState } from "react";
import { supabase } from "../../lib/supabase";
import {
  FormActions,
  FormCard,
  FormInput,
} from "../../components/FormControls";
import { PageTitle } from "./PageTitle";

export function AddClientPage() {
  const [clientName, setClientName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddClient = async () => {
    if (
      !clientName ||
      !companyName ||
      !phoneNumber ||
      !email
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const { error } = await supabase
        .from("clients")
        .insert([
          {
            client_name: clientName,
            company_name: companyName,
            phone_number: phoneNumber,
            email,
          },
        ]);

      if (error) {
        console.error(error);
        alert(error.message);
        return;
      }

      alert("Client added successfully!");

      setClientName("");
      setCompanyName("");
      setPhoneNumber("");
      setEmail("");
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageTitle page="Add Client" />

      <FormCard
        title="Client Information"
        description="All fields are required to create a client record."
      >
        <div className="grid grid-cols-2 gap-6">
          <FormInput
            label="Client Name"
            placeholder="Enter client name"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
          />

          <FormInput
            label="Company Name"
            placeholder="Enter company name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />

          <FormInput
            label="Phone Number"
            placeholder="Enter phone number"
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />

          <FormInput
            label="Email Address"
            placeholder="Enter email address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div
          onClick={handleAddClient}
          className={loading ? "pointer-events-none opacity-60" : ""}
        >
          <FormActions
            primary={loading ? "Saving..." : "Add Client"}
          />
        </div>
      </FormCard>
    </>
  );
}