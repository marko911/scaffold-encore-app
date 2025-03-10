#!/bin/bash

# Unpublish all versions
echo "Unpublishing all versions of mb-init..."
npm unpublish mb-init@1.0.0 --force 2>/dev/null || echo "Version 1.0.0 not found or already unpublished"
npm unpublish mb-init@1.0.1 --force 2>/dev/null || echo "Version 1.0.1 not found or already unpublished"
npm unpublish mb-init@1.0.2 --force 2>/dev/null || echo "Version 1.0.2 not found or already unpublished"
npm unpublish mb-init@1.0.3 --force 2>/dev/null || echo "Version 1.0.3 not found or already unpublished"
npm unpublish mb-init@1.0.4 --force 2>/dev/null || echo "Version 1.0.4 not found or already unpublished"

echo "All versions unpublished. Now you can publish a fresh version." 