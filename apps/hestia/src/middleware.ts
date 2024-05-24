import { defaultConfig } from "@orderbook/core/config";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export function middleware(req: NextRequest) {
  const {
    enableLmp: isRewardsActive,
    enableBridge: isBridgeActive,
    maintenanceMode,
  } = defaultConfig;

  if (maintenanceMode) {
    return NextResponse.redirect(new URL("/maintenance", req.url));
  }
  if (!isRewardsActive && req.nextUrl.pathname.startsWith("/rewards")) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  if (!isBridgeActive && req.nextUrl.pathname.startsWith("/thea")) {
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: [
    "/",
    "/rewards",
    "/rewards/:path*",
    "/trading",
    "/trading/:path*",
    "/transfer",
    "/transfer/:path*",
    "/history",
    "/balances",
    "/cexOnRamp",
    "/thea",
  ],
};
