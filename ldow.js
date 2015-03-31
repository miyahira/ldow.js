var cwapi = require('cwapi')
var config = require("./config.js")
var _ = require("underscore")

cwapi.token = config.key


cwapi.getRooms(function(data, res){
  rooms = data
  // filter non groups (DMs) out
  rooms = _.filter(rooms, function(room){return room.type == "group"})
  rooms = _.sortBy(rooms, "room_id")

  rooms = _.map(rooms, function(member){
    return _.pick(member, ["room_id", "name"])
  })
  //console.log(rooms)

  //leave all rooms
  _.each(rooms, function(room){
    cwapi.leaveRoom(room.room_id, function(data, res){
      console.log(room + " 退出完了")
    })
  })

})
