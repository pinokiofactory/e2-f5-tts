module.exports = {
  requires: {
    bundle: "ai"
  },
  run: [
    {
      method: "shell.run",
      params: {
        message: [
          "git clone https://github.com/SWivid/F5-TTS app",
        ]
      }
    },
    {
      when: "{{exists('app/env')}}",
      method: "fs.rm",
      params: {
        path: "app/env"
      }
    },
    {
      method: "shell.run",
      params: {
        venv_python: "3.11",
        venv: "venv",
        path: "app",
        message: [
          "uv pip install -e .",
          "uv pip uninstall torchcodec",
          "uv pip install hf_xet"
        ]
      }
    },
    {
      method: "script.start",
      params: {
        uri: "torch.js",
        params: {
          venv: "venv",
          path: "app",
          // xformers: true
        }
      }
    },
    {
      method: "notify",
      params: {
        html: "Click the 'start' tab to get started!"
      }
    }
  ]
}
