function getDeltaTimeString(from: number | undefined) {
    if (from == undefined) return ""
    let delta = (Date.now() - from) / 1000
    let t = Math.floor(delta / 86400)
    if (t) return `${t} day${t != 1 ? 's' : ''}`
    if (t = Math.floor(delta / 3600)) return `${t} hour${t != 1 ? 's' : ''}`
    if (t = Math.floor(delta / 60)) return `${t} minute${t != 1 ? 's' : ''}`
    return `${t} second${t != 1 ? 's' : ''}`
}

function getDeltaTimeStringBySecond(from: number | undefined) {
    if (from == undefined) return ""
    return getDeltaTimeString(from * 1000)
}

export { getDeltaTimeString, getDeltaTimeStringBySecond }