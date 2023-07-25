"use client";
import React from "react";
import Modal from "@/components/modals";
import { useModals } from "@/utils/modal";

function Index() {
  const modals = useModals();
  return <> {!!modals.length && <Modal />}</>;
}

export default Index;
