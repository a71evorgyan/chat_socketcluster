import {socketCluster} from 'socketcluster-client';
var options = {
  port: 8000
};
 
// Initiate the connection to the server
var socket = socketCluster.create(options);