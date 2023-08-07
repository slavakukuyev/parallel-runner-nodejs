class ParallelRunner {
    //TODO: add members as needed
    parallelTasks = 0
    parallels = []
    results = []
    err


    //Accepts a function that returns a promise.
    //The function represents an asynchronous task that did not start running yet - and will start running when the function is called.
    //The function should be queued for running, and will run during getResults().
    add(f) {
        this.parallels.push(f)
    }

    //Runs the pending tasks concurrently, while never running more than maxConcurrent functions at a time.
    //The function should do its best to run *exactly* maxConcurrent functions at a time - not less - at any given time.
    //The results must be returned in the exact order in which the functions were originally queued using add().
    //If one or more of the queued functions throw an exception, getResults() should throw an exception as well, and await all the other ongoing function calls, to make sure all of them complete before the function returns, and not call any new functions.
    async getResults(maxConcurrent) {
        for (let i = 0; i < this.parallels.length; i++) {
            while (this.parallelTasks == maxConcurrent) {
                await sleep(100)
            }

            this.parallelTasks++
            this.run(this.parallels[i], i)

            if (this.err) {
                i = this.parallels.length
            }
        }

        while (this.parallelTasks > 0) {
            await sleep(100)
        }

        if (this.err) {
            throw this.err;
        }

        return this.results;
    }

    async run(f, i) {
        let res;

        try {
            res = await f()
        } catch (e) {
            this.err = e
            res = 0
        }

        this.parallelTasks--
        this.results[i] = res
        return res;
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function sampleUsage() {
    console.log("Started.");
    const runner = new ParallelRunner();
    for (let i = 0; i < 50; ++i) {
        runner.add(async () => {
            //console.log(`Printing ${i}`);
            await sleep(Math.floor(Math.random() * 1000));
            return i;
        });
    }

    try {
        let startTime = Date.now()
        const results = await runner.getResults(10);
        console.log("Results:");
        console.log(JSON.stringify(results));
        console.log("Exiting.");
        console.log('finished in ', (Date.now() - startTime) / 1000, ' ms')
    } catch (e) {
        console.error(e)
    }
}

sampleUsage();
