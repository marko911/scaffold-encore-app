package frontend

import (
	"embed"
	"fmt"
	"io/fs"
	"net/http"
	"net/http/httputil"
	"net/url"
	"os"
)

var (
	//go:embed dist
	dist embed.FS

	// Use a function to initialize assets to handle potential errors gracefully
	prodHandler http.Handler
)

func init() {
	// Try to access the embedded dist directory
	assets, err := fs.Sub(dist, "dist")
	if err != nil {
		// If there's an error, we'll handle it at serve time
		fmt.Println("Warning: embedded dist directory not available:", err)
	} else {
		prodHandler = http.StripPrefix("/frontend/", http.FileServer(http.FS(assets)))
	}
}

// Serve serves the frontend for both development and production.
//
//encore:api public raw path=/!fallback
func Serve(w http.ResponseWriter, req *http.Request) {
	if os.Getenv("ENVIRONMENT") == "development" {
		// Point to base Vite server URL
		fmt.Println("Serving frontend in development mode")
		viteDevServer, _ := url.Parse("http://localhost:5173")
		proxy := httputil.NewSingleHostReverseProxy(viteDevServer)

		// Use the original director without path modifications
		originalDirector := proxy.Director
		proxy.Director = func(req *http.Request) {
			originalDirector(req)
			// No path modifications - pass through as-is
			fmt.Println("Proxying to:", req.URL.Path)
		}

		proxy.ServeHTTP(w, req)
		return
	}
	fmt.Println("Serving frontend in production mode")

	// Check if prodHandler is initialized
	if prodHandler == nil {
		http.Error(w, "Frontend assets not available. Please build the frontend first.", http.StatusServiceUnavailable)
		return
	}

	// Serve production build from embedded files
	prodHandler.ServeHTTP(w, req)
}
