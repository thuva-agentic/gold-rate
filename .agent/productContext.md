# Product Context

## Problem

Gold buyers and sellers in Sri Lanka often reason in **pawn** units (traditionally **8 grams**). Spot prices are quoted per gram or per troy ounce in USD; converting to **LKR** and **8g** mentally is error-prone.

## Solution

A simple dashboard that:

1. Fetches **international gold spot** (USD/troy oz) and **USD→LKR** FX, combined server-side
2. Computes and highlights **price for 8g (1 pawn)** in **LKR** (24k default; **22k toggle**)
3. Refreshes every **30 seconds** and shows when data was last updated

## Users

- Retail customers checking today’s pawn rate
- Shop staff needing a quick reference display

## UX principles

- **One number matters most**: 8g pawn price in LKR, large and readable
- Secondary: per-gram LKR, USD spot, FX rate, source attribution
- **24k / 22k** purity toggle on the dashboard
- LKR amounts formatted with **2 decimal places** (`Rs. 1,234.56`)
- Clear offline/error state — never show stale data without a warning
