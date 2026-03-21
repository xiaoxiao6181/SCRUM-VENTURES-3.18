function parseData(data) {
    if (data === undefined)
      return
    const result = []
    for (const h of data) {    
      const val = {
        open: parseFloat(h.open),
        close: parseFloat(h.close),
        low: parseFloat(h.low),
        high: parseFloat(h.high),
        timestamp: h.date * 1000,
        volume: parseFloat(h.vol) ,
      }
      result.push(val)
    }
    result.sort((a, b) => a.timestamp - b.timestamp)
    return result
  }