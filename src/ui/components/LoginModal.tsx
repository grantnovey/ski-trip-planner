"use client";

import React from "react";
import { Button } from "@/ui/components/Button";
import { Dialog } from "@/ui/components/Dialog";
import { TextField } from "@/ui/components/TextField";

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LoginModal({ open, onOpenChange }: LoginModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Dialog.Content>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex w-full max-w-md flex-col items-start gap-6 p-6"
        >
          <div className="flex w-full flex-col items-start gap-2">
            <span className="text-heading-2 font-heading-2 text-default-font">
              Log in
            </span>
            <span className="text-body font-body text-subtext-color">
              Sign in to your account to continue
            </span>
          </div>
          <div className="flex w-full flex-col items-start gap-4">
            <TextField label="Email">
              <TextField.Input
                type="email"
                placeholder="you@example.com"
                required
              />
            </TextField>
            <TextField label="Password">
              <TextField.Input
                type="password"
                placeholder="••••••••"
                required
              />
            </TextField>
          </div>
          <div className="flex w-full items-center justify-end gap-2">
            <Button
              variant="neutral-secondary"
              type="button"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Log in</Button>
          </div>
        </form>
      </Dialog.Content>
    </Dialog>
  );
}
