#!/bin/bash

# Runs the GitHub stats sync every 6 hours
# Compatible with Alpine Linux / BusyBox

INTERVAL_SECONDS=$((6 * 60 * 60))  # 6 hours in seconds

echo "[Sync Runner] Starting sync loop (interval: 6 hours)"

while true; do
    echo "[Sync Runner] Running sync at $(date -Iseconds)"
    npm run sync:github || echo "[Sync Runner] Sync failed, will retry next interval"

    echo "[Sync Runner] Next sync in 6 hours"
    sleep $INTERVAL_SECONDS
done
