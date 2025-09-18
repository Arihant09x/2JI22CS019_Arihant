async function log(stack, level, package, message) {
  const logdata = {
    stack,
    level,
    package,
    message,
  };
  try {
    const res = await fetch("http://20.244.56.144/evaluation-service/logs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(logdata),
    });
    if (!res.ok) {
      throw new Error("Failed to send logdata");
    } else {
      res.json({
        status: "sucess",
        message: "log sent successfully",
        data: logdata,
      });
    }
  } catch (e) {
    console.log(e);
  }
}

module.exports = { log };
