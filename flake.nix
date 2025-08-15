{
  description = "DevShell for React + Vite";

  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";

  outputs = {
    self,
    nixpkgs,
  }: let
    system = "x86_64-linux";
    pkgs = import nixpkgs {inherit system;};
  in {
    devShells.${system}.default = pkgs.mkShell {
      buildInputs = with pkgs; [
        nodejs
      ];

      shellHook = ''
        export NODE_ENV=development

        ensure_pnpm_package() {
           local pkg=$1

          if pnpm list --depth=0 | grep "$pkg" &>/dev/null; then
            echo "$pkg installed"
          else
            echo "Installing $pkg..."
            pnpm add "$pkg"
          fi
        }

        ensure_pnpm_package react
        ensure_pnpm_package react-dom
        ensure_pnpm_package vite

        echo "Entering the development environment!"
        echo "Node: $(node -v), pnpm: $(pnpm -v)"

        alias dev="pnpm vite --host 127.0.0.1 --open"
        alias build="pnpm vite build"

        trap 'echo "Leaving the development environment!"' EXIT
      '';
    };
  };
}
