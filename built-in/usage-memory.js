
//pase this code in index.js or route block
setInterval(() => {
    const formatMemoryUsage = (data) => Math.round(data / 1024 / 1024 * 100) / 100 + 'MB'
    const memoryData = process.memoryUsage()
    const memoryUsage = {
      total: formatMemoryUsage(memoryData.rss),
      heapTotal: formatMemoryUsage(memoryData.heapTotal),
      heapUsed: formatMemoryUsage(memoryData.heapUsed),
      external: formatMemoryUsage(memoryData.external),
    };

    console.log(memoryUsage)
  }, 5000)
