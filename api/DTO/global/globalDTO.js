class ListResponseDTO {
  constructor(items) {
    return items.map(item => ({
      value: item.value,
      text: item.text
    }));
  }
}

module.exports = { ListResponseDTO }
