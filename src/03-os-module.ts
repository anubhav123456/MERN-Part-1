import * as os from "node:os";

function runOsDemo(): void 
{
    console.log("platform", os.platform());
    console.log("architecture", os.arch());
    console.log("os type", os.type());
    console.log("os release", os.release());
    console.log("home directory", os.homedir());
    console.log("temp dir", os.tmpdir());

    const cpus = os.cpus();

    console.log("CPU Count ", cpus.length);

    cpus.forEach((cpu)=>
    {
        console.log("CPU Model ", cpu.model);
        console.log("CPU Speed ", cpu.speed);
        console.log("CPU Time ", cpu.times);
        console.log("-------------------------------------------------------------------------");
    })

    console.log(os.totalmem(), os.freemem());
}

runOsDemo();