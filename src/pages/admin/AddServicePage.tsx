import { useEffect, useState } from "react";
import { serviceTypeOptions } from "../../data";
import { supabase } from "../../lib/supabase";
import { SegmentedSelector } from "../../components/Filters";
import {
  FormActions,
  FormCard,
  FormInput,
  FormSelect,
} from "../../components/FormControls";
import { PageTitle } from "./PageTitle";

type Client = {
  id: string;
  client_name: string;
  company_name: string;
};

export function AddServicePage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [clientId, setClientId] = useState("");

  const [serviceType, setServiceType] =
    useState<(typeof serviceTypeOptions)[number]>("Domain");

  const [serviceName, setServiceName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [renewalCost, setRenewalCost] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadClients();
  }, []);

  async function loadClients() {
    const { data, error } = await supabase
      .from("clients")
      .select("id, client_name, company_name")
      .order("company_name");

    if (error) {
      console.error(error);
      return;
    }

    setClients(data || []);

    if (data?.length) {
      setClientId(data[0].id);
    }
  }

  async function handleAddService() {
    if (
      !clientId ||
      !serviceName ||
      !expiryDate ||
      !renewalCost
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const { error } = await supabase
        .from("services")
        .insert([
          {
            client_id: clientId,
            service_name: serviceName,
            service_type: serviceType,
            expiry_date: expiryDate,
            renewal_cost: Number(renewalCost),
          },
        ]);

      if (error) {
        console.error(error);
        alert(error.message);
        return;
      }

      alert("Service added successfully!");

      setServiceName("");
      setExpiryDate("");
      setRenewalCost("");
      setServiceType("Domain");
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <PageTitle page="Add Service" />

      <FormCard
        title="Service Details"
        description="All fields are required to register a renewable service."
      >
        <div className="grid grid-cols-2 gap-6">
          <FormSelect
            label="Client"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
          >
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.company_name}
              </option>
            ))}
          </FormSelect>

          <div>
            <span className="text-sm font-semibold text-text-primary">
              Service Type
            </span>

            <div className="mt-2">
              <SegmentedSelector
                options={serviceTypeOptions}
                active={serviceType}
                onChange={setServiceType}
              />
            </div>
          </div>

          <FormInput
            label="Service Name"
            placeholder="e.g. teqid.com"
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
          />

          <FormInput
            label="Expiry Date"
            type="date"
            placeholder=""
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
          />

          <FormInput
            label="Renewal Cost"
            placeholder="0.00"
            value={renewalCost}
            onChange={(e) => setRenewalCost(e.target.value)}
          />
        </div>

        <FormActions
          primary={loading ? "Saving..." : "Add Service"}
          onPrimaryClick={handleAddService}
        />
      </FormCard>
    </>
  );
}