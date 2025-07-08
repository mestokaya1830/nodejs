const responseTime = (req, res, next) => {
  const startTime = process.hrtime()//start

  res.on('finish', ()=>{
    const totalTime = process.hrtime(startTime);//finish
    const totalTimeInMs = totalTime[0] * 1000 + totalTime[1] / 1e6
    console.log(totalTimeInMs.toFixed(0))
  });
  
  next()
}

export default responseTime