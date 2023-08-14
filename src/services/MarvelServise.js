class MarvelService {
  _apiBase = "https://gateway.marvel.com:443/v1/public/"
  // ЗДЕСЬ БУДЕТ ВАШ КЛЮЧ, ЭТОТ КЛЮЧ МОЖЕТ НЕ РАБОТАТЬ
  _apiKey = "apikey=081475fdba1811c1dd66383857bcb33c"

  getResource = async (url) => {
    let res = await fetch(url)

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`)
    }

    return await res.json()
  }

  getAllCharacters = async () => {
    const response = await this.getResource(
      `${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`
    )
    return response.data.results.map(this._transformCharacter)
  }

  getCharacter = async (id) => {
    const response = await this.getResource(
      `${this._apiBase}characters/${id}?${this._apiKey}`
    )
    return this._transformCharacter(response.data.results[0])
  }

  _transformCharacter = (char) => {
    if (!char.description) {
      char.description = "No description"
    } else {
      char.description = char.description.substring(0, 100)
    }
    return {
      id: char.id,
      name: char.name,
      description: char.description,
      thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items,
    }
  }
}

export default MarvelService
