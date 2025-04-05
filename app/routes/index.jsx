import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const [name, setName] = useState("");
  const [submittedName, setSubmittedName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedName(name);
  };

  return (
    <div className="p-8">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>ShadCN Components Demo</CardTitle>
          <CardDescription>
            Explore a few shadcn UI components styled with Tailwind CSS.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-1">
              <Label htmlFor="name">Your Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>
            <Button type="submit">Submit</Button>
          </form>
          {submittedName && (
            <p className="mt-4 text-center">Hello, {submittedName}!</p>
          )}
          <div className="mt-6 text-center">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline">More Info</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>About ShadCN UI</AlertDialogTitle>
                  <AlertDialogDescription>
                    This demo showcases several shadcn components including Cards, Inputs, and AlertDialogs.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="mt-4 flex justify-end space-x-2">
                  <AlertDialogCancel>
                    <Button variant="ghost">Cancel</Button>
                  </AlertDialogCancel>
                  <AlertDialogAction>
                    <Button>OK</Button>
                  </AlertDialogAction>
                </div>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">Powered by shadcn UI</p>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Home;
