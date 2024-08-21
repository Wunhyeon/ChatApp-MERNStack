"use client";

import { ENDPOINT } from "@/lib/constants";
import { io } from "socket.io-client";

export const socket = io(ENDPOINT);
