"use client";

import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DependantsTable } from "./DependantsTable";
import { RegistrationFormData, Dependant } from "@/types";
import i18next from "i18next";
import translation from "zod-i18n-map/locales/es/zod.json";
import { zodI18nMap } from "zod-i18n-map";
import { SchemaBuilder } from "@/lib/validation/SchemaBuilder";

const v = new SchemaBuilder();

const schema = v.object({
  name: v.string().max(5),
  address: v.string().min(5),
  birthday: v.date().min(new Date(1, 2, 1991)),
  dependants: v
    .array(
      v.object({
        name: v.string().min(2),
        lastName: v.string().min(2),
        role: v.string().min(2),
      }),
    )
    .min(2),
});

i18next.init({
  lng: "es",
  resources: {
    es: { zod: translation },
  },
});
z.setErrorMap(zodI18nMap);

const formSchema = z.object({
  name: z.string().min(2),
  address: z.string().min(5),
  birthday: z.date(),
  dependants: z
    .array(
      z.object({
        name: z.string().min(2),
        lastName: z.string().min(2),
        role: z.string().min(2),
      }),
    )
    .min(2),
});

export function RegistrationForm() {
  const [formData, setFormData] = useState<RegistrationFormData>({
    name: "",
    address: "",
    birthday: undefined,
    dependants: [],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date: Date | undefined) => {
    setFormData((prev) => ({ ...prev, birthday: date }));
  };

  const handleAddDependant = () => {
    setFormData((prev) => ({
      ...prev,
      dependants: [...prev.dependants, { name: "", lastName: "", role: "" }],
    }));
  };

  const handleRemoveDependant = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      dependants: prev.dependants.filter((_, i) => i !== index),
    }));
  };

  const handleUpdateDependant = (
    index: number,
    field: keyof Dependant,
    value: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      dependants: prev.dependants.map((dep, i) =>
        i === index ? { ...dep, [field]: value } : dep,
      ),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log(schema.validate(formData));
      console.log(formSchema.safeParse(formData));
    } catch (e) {
      console.dir(e);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <label htmlFor="name">Name</label>
          <Input
            placeholder="John Doe"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <p>This is your full name.</p>
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <Input
            placeholder="123 Main St, City, Country"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
          />
          <p>Enter your full address.</p>
        </div>
        <div className="flex flex-col">
          <label htmlFor="birthday">Date of birth</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] pl-3 text-left font-normal",
                  !formData.birthday && "text-muted-foreground",
                )}
              >
                {formData.birthday ? (
                  format(formData.birthday, "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={formData.birthday}
                onSelect={handleDateChange}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <p>Your date of birth is used to calculate age.</p>
        </div>
        <div>
          <label htmlFor="dependants">Dependants</label>
          <DependantsTable
            dependants={formData.dependants}
            onAddDependant={handleAddDependant}
            onRemoveDependant={handleRemoveDependant}
            onUpdateDependant={handleUpdateDependant}
          />
          <p>Add your dependants here.</p>
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
