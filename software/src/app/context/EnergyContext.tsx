"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { Charging, Status } from "@/app/pages/ChargingHistory/types";
import { axiosInstance } from "@/app/utils/axios_config";

interface EnergyContextProps {
  isCurrentCharging: (charging: Charging) => boolean;
}

const EnergyContext = createContext<EnergyContextProps | undefined>(undefined);

export function EnergyProvider({ children }: { children: ReactNode }) {
  const getChargingHistory = async (): Promise<Charging[] | undefined> => {
    try {
      const response = await axiosInstance.get(`/pages/api/carregamento/`);
      if (response.status === 200) {
        return response.data.carregamento;
      }
    } catch (error: any) {
      console.log("Erro ao buscar usuário por id");
    }
  };

  useEffect(() => {
    async function findCurrentCharging() {
      const chargingArray: Charging[] | undefined = await getChargingHistory();
      if (chargingArray) {
        const charging = chargingArray.find(
          (charging) => charging.statusCarregamento == Status.PROGRESS
        );

        if (charging != undefined) {
          localStorage.setItem("currentCharging", charging._id);
        }
      }
    }
    findCurrentCharging();
  }, []);

  const isCurrentCharging = (charging: Charging) => {
    return charging._id === localStorage.getItem("currentCharging");
  };

  return (
    <EnergyContext.Provider
      value={{
        isCurrentCharging,
      }}
    >
      {children}
    </EnergyContext.Provider>
  );
}

export function useEnergyContext() {
  const context = useContext(EnergyContext);
  if (context === undefined) {
    throw new Error("useMyContext must be used within a MyProvider");
  }
  return context;
}
