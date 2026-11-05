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
    when: "{{exists('app/env')}}",
    method: "fs.rm",
    params: {
      path: "app/env"
    }
  }, {
    method: "shell.run",
    params: {
      venv: "venv",
      path: "app",
      message: [
        "pip install -e ."
      ]
    }
  }]
}
