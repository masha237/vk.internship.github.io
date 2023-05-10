import React from "react";

export type Jwt = {
    jwt: string | null,
    setJwt: React.Dispatch<React.SetStateAction<string | null>>
}