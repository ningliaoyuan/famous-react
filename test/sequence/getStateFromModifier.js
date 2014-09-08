/*global describe, it*/
'use strict';

var should = require('chai').should();
var StateModifier = require('famous/modifiers/StateModifier');
var Transform = require('famous/core/Transform');
var clone = require('lodash.clone');
var getStateFromModifier = require('../../src/sequence/getStateFromModifier');

var defaultState = {
  x: 0,
  y: 0,
  z: 0,
  translate: [0, 0, 0],
  rotate: [0, 0, 0],
  rotateX: 0,
  rotateY: 0,
  rotateZ: 0,
  scale: [1, 1, 1],
  skew: [0, 0, 0],
  perspective: null,
  width: null,
  height: null,
  opacity: 1,
  origin: null,
  align: null,
  transform: Transform.identity,
  center: false
};

describe('sequence/getStateFromModifier', function(){
  it('should return height state', function(done){
    var mod = new StateModifier();
    mod.setSize([undefined, 100]);

    var state = getStateFromModifier(mod);
    state.height.should.equal(100);
    done();
  });

  it('should return width state', function(done){
    var mod = new StateModifier();
    mod.setSize([100, undefined]);

    var state = getStateFromModifier(mod);
    state.width.should.equal(100);
    done();
  });

  it('should return opacity state', function(done){
    var mod = new StateModifier();
    mod.setOpacity(0.5);

    var state = getStateFromModifier(mod);
    state.opacity.should.equal(0.5);
    done();
  });

  it('should return origin state', function(done){
    var mod = new StateModifier();
    mod.setOrigin([0.5, 0]);

    var state = getStateFromModifier(mod);
    state.origin.should.eql([0.5, 0]);
    done();
  });

  it('should return align state', function(done){
    var mod = new StateModifier();
    mod.setAlign([0.5, 0]);

    var state = getStateFromModifier(mod);
    state.align.should.eql([0.5, 0]);
    done();
  });

  it('should return x y and z from translate', function(done){
    var mod = new StateModifier();
    mod._transformState.setTranslate([100, 200, 300]);

    var state = getStateFromModifier(mod);
    state.translate.should.eql([100, 200, 300]);
    state.x.should.equal(100);
    state.y.should.equal(200);
    state.z.should.equal(300);
    done();
  });

  it('should return rotateX rotateY and rotateZ from rotate', function(done){
    var mod = new StateModifier();
    mod._transformState.setRotate([100, 200, 300]);

    var state = getStateFromModifier(mod);
    state.rotate.should.eql([100, 200, 300]);
    state.rotateX.should.equal(100);
    state.rotateY.should.equal(200);
    state.rotateZ.should.equal(300);
    done();
  });
});