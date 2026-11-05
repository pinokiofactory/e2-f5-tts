module.exports = {
  requires: {
    bundle: "ai",
  },
  daemon: true,
  run: [
    {
      method: "shell.run",
      params: {
        venv: "venv",
        env: {
          "PYTORCH_ENABLE_MPS_FALLBACK": 1,
          "HF_HUB_ENABLE_HF_TRANSFER": 0
        },
        path: "app",
        message: [
          "f5-tts_infer-gradio"
        ],
        on: [{
          "event": "/http:\/\/\\S+/",
          "done": true
        }]
      }
    },
    {
      method: "local.set",
      params: {
        url: "{{input.event[0]}}"
      }
    }
  ]
}
