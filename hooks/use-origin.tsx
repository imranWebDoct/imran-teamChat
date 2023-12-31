"use client";

import { useEffect, useState } from "react";

export const useOrigin = () => {
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => { setHasMounted(true) }, [])
    const origin = typeof window !== "undefined" && window.location.origin ? window.location.origin : "";

    if (!hasMounted) {
        return null;
    }

    return origin;
}