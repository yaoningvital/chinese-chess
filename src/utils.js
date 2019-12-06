export const chessDefault = [
  [
    {side: 0, role: 'ju', name: '車'},
    {side: 0, role: 'ma', name: '馬'},
    {side: 0, role: 'xiang', name: '相'},
    {side: 0, role: 'shi', name: '仕'},
    {side: 0, role: 'jiang', name: '帥'},
    {side: 0, role: 'shi', name: '仕'},
    {side: 0, role: 'xiang', name: '相'},
    {side: 0, role: 'ma', name: '馬'},
    {side: 0, role: 'ju', name: '車'},
  ],
  [null, null, null, null, null, null, null, null, null],
  [
    null,
    {side: 0, role: 'pao', name: '炮'},
    null,
    null,
    null,
    null,
    null,
    {side: 0, role: 'pao', name: '炮'},
    null
  ],
  [
    {side: 0, role: 'bing', name: '兵'},
    null,
    {side: 0, role: 'bing', name: '兵'},
    null,
    {side: 0, role: 'bing', name: '兵'},
    null,
    {side: 0, role: 'bing', name: '兵'},
    null,
    {side: 0, role: 'bing', name: '兵'},
  ],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [
    {side: 1, role: 'bing', name: '卒'},
    null,
    {side: 1, role: 'bing', name: '卒'},
    null,
    {side: 1, role: 'bing', name: '卒'},
    null,
    {side: 1, role: 'bing', name: '卒'},
    null,
    {side: 1, role: 'bing', name: '卒'},
  ],
  [
    null,
    {side: 1, role: 'pao', name: '砲'},
    null,
    null,
    null,
    null,
    null,
    {side: 1, role: 'pao', name: '砲'},
    null
  ],
  [null, null, null, null, null, null, null, null, null],
  [
    {side: 1, role: 'ju', name: '車'},
    {side: 1, role: 'ma', name: '馬'},
    {side: 1, role: 'xiang', name: '象'},
    {side: 1, role: 'shi', name: '士'},
    {side: 1, role: 'jiang', name: '將'},
    {side: 1, role: 'shi', name: '士'},
    {side: 1, role: 'xiang', name: '象'},
    {side: 1, role: 'ma', name: '馬'},
    {side: 1, role: 'ju', name: '車'},
  ],
]

/**
 * 判断传入的点（坐标：rowIndex, columnIndex）是不是传入的 落子点（ableReceiveCoordinates）中的一个，是 返回 true
 * @param ableReceiveCoordinates
 * @param rowIndex
 * @param columnIndex
 * @returns {boolean}
 */
export function isOneOfAbleReceive (ableReceiveCoordinates, rowIndex, columnIndex) {
  let isOneOfAbleReceive = false
  for (let ableReceiveItem of ableReceiveCoordinates) {
    if (ableReceiveItem[0] === rowIndex && ableReceiveItem[1] === columnIndex) {
      isOneOfAbleReceive = true
      break
    }
  }
  
  return isOneOfAbleReceive
}

export function getWinner (currentStep, history) {
  let winner = null
  let [side0Lost, side1Lost] = history[currentStep].lostPieces
  
  if (side0Lost.length > 0 && side0Lost[side0Lost.length - 1].role === 'jiang') {
    winner = '將'
  } else if (side1Lost.length > 0 && side1Lost[side1Lost.length - 1].role === 'jiang') {
    winner = '帥'
  }
  
  return winner
}