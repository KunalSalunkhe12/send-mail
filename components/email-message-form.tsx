"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Minus } from "lucide-react";
import sendMails from "@/lib/action/sendMails";

export function EmailMessageForm() {
  const [emails, setEmails] = useState([""]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const addEmailField = () => {
    setEmails([...emails, ""]);
  };

  const removeEmailField = (index: number) => {
    const newEmails = emails.filter((_, i) => i !== index);
    setEmails(newEmails);
  };

  const handleEmailChange = (index: number, value: string) => {
    const newEmails = [...emails];
    newEmails[index] = value;
    setEmails(newEmails);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await sendMails({ emails, message });
      if (!res.success) {
        setLoading(false);
        return alert("Form Submission failed!!");
      }
      setLoading(false);
      return alert("Form submitted!");
    } catch (error) {
      setLoading(true);
      return alert("Form Submission failed!!");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Email Message Form</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="block font-medium">Email Addresses</label>
          {emails.map((email, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Input
                type="email"
                value={email}
                onChange={(e) => handleEmailChange(index, e.target.value)}
                placeholder="Enter email address"
                required
              />
              {index > 0 && (
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removeEmailField(index)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
              )}
              {index === emails.length - 1 && (
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={addEmailField}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <label htmlFor="message" className="block font-medium">
            Message
          </label>
          <Textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your message here"
            required
            className="min-h-[150px]"
          />
        </div>
        <Button type="submit" className="w-full">
          Send Message
        </Button>
      </form>
    </div>
  );
}
