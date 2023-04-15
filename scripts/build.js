const fs = require("fs");
const path = require("path");

function build_scss() {
  const dir = "dist/public/css";
  const output = path.join(dir, "styles.css");

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const scss = require("node-sass");
  scss.render(
    {
      file: "src/client/scss/main.scss",
      outputStyle: "compressed",
    },
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        fs.writeFileSync(output, result.css);
      }
    }
  );
}

function build_views() {
  fs.cpSync("src/client/views", "dist/views", { recursive: true });
}

function build_images() {
  fs.cpSync("src/public/img", "dist/public/img", { recursive: true });
}

build_scss();
build_views();
build_images();
