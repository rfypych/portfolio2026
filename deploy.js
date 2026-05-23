import * as ftp from "basic-ftp";

async function deploy() {
    const client = new ftp.Client();
    client.ftp.verbose = true;
    try {
        await client.access({
            host: "103.123.17.197",
            user: "anseinco",
            password: "MTi27L[db7Z]4t",
            secure: false
        });
        console.log("Connected. Emptying /development directory if it exists...");
        await client.ensureDir("development");
        await client.clearWorkingDir();

        console.log("Uploading ./dist folder...");
        await client.uploadFromDir("dist");

        console.log("Deployment successful!");
    }
    catch (err) {
        console.error("Deployment failed:", err);
    }
    client.close();
}

deploy();
