# Product Context

## Problem

Gold buyers and sellers in Sri Lanka often reason in **pawn** units (traditionally **8 grams**). Spot prices are quoted per gram or per troy ounce in USD; converting to **LKR** and **8g** mentally is error-prone.

## Solution

A simple dashboard that:

1. Fetches a trusted **live gold rate** (source TBD in spec Q&A)
2. Computes and highlights **price for 8g (1 pawn)** in **LKR**
3. Refreshes automatically and shows when data was last updated

## Users

- Retail customers checking today’s pawn rate
- Shop staff needing a quick reference display

## UX principles

- **One number matters most**: 8g pawn price in LKR, large and readable
- Secondary: per-gram rate, last updated time, source attribution
- Clear offline/error state — never show stale data without a warning
