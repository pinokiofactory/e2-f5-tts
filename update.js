module.exports = {
  run: [{
    method: "shell.run",
    params: {
      message: "git pull"
    }
  }, {
    method: "shell.run",
    params: {
      path: "app",
      message: "git pull"
    }
  }, {
    method: "shell.run",
    params: {
      venv: "env",                // Edit this to customize the venv folder path
      path: "app",                // Edit this to customize the path to start the shell from
      message: [
        "uv pip install -e .",
        "uv pip uninstall torchcodec",
        "uv pip install hf_xet",
        // transformers >= 5 requires torch.float8_e8m0fnu (torch >= 2.7) at import
        // time and breaks the torch 2.4.1 platforms (directml/cpu/mac) with
        // "AttributeError: module 'torch' has no attribute 'float8_e8m0fnu'"
        "uv pip install transformers==4.50.3"
      ]
    }
  }, {
    // Re-run torch.js AFTER the editable install:
    // "uv pip install -e ." can upgrade torch/torchaudio to versions that
    // mismatch each other (and torch-directml), breaking the venv with
    // "OSError: [WinError 127]". This step pins them back per platform/gpu.
    method: "script.start",
    params: {
      uri: "torch.js",
      params: {
        venv: "env",
        path: "app"
      }
    }
  }, {
    method: "fs.link",
    params: {
      venv: "app/env"
    }
  }]
}
