# To see example usage of this file have a look at ./test-build.sh or the
# deployment GitHub Actions workflow file.
let
  sources = import ../nix/sources.nix;
  pkgs    = import sources.nixpkgs {};
  app     = (import ./. { inherit pkgs; }).package;
in
{ tag
, port
, host
, contract-address
, contract-name
, blockchain-url
, sender
, sender-key
, stacks-net
, rebuild-hook
, nasdaq-link-api-key
}: pkgs.dockerTools.buildImage {
  inherit tag;
  name       = "stacks-oracle";
  created    = "now"; # Breaks binary reproducability but adds meaningful timestamp.
  copyToRoot = pkgs.buildEnv {
    name        = "image-root";
    # busybox is a set of "tiny versions of common UNIX utilities in a single
    # small executable", common utilities like 'sh' or 'ls'. Including busybox
    # allows us to override the entrypoint of a failing Docker image and enter a
    # shell inside the Docker image, for example:
    #   docker run -it --entrypoint /bin/sh stacks-oracle:my-failing-image
    paths       = [ app pkgs.busybox pkgs.nodejs ];
    pathsToLink = [ "/bin" ];
  };
  config = {
    Entrypoint = [ "/bin/stacks-oracle" ];
    Env        = [
      "PORT=${port}"
      "HOST=${host}"
      "CONTRACT_ADDRESS=${contract-address}"
      "CONTRACT_NAME=${contract-name}"
      "BLOCKCHAIN_URL=${blockchain-url}"
      "SENDER=${sender}"
      "SENDER_KEY=${sender-key}"
      "STACKS_NET=${stacks-net}"
      "REBUILD_HOOK_URL=${rebuild-hook}"
      "NASDAQ_LINK_API_KEY=${nasdaq-link-api-key}"
    ];
  };
}
