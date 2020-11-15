
class Response {
  constructor(param, mode, name){
    this.param = param
    this.mode = mode
    this.code = 0
    this.name = name
  }

  async getResponse(){
  try{
    let params = new Map([[this.name, this.param]])
    const response = this.getStructure()
    for (var [param, value] of params) {
     response[param] = value
    }
    return response
    }catch(e){
      console.error(e)
  }

  }
  getStructure() {
    return {
      status: this.mode,
      code: 0
    }
  }
  getParam(){ return this.param }
  getMode() { return this.mode }


}

module.exports = Response