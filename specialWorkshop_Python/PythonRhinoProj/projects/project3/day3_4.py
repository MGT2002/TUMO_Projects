import rhinoscriptsyntax as rs
import Rhino.Geometry as rg
import NOPA_Library as nopa
import math as m
def createMembers(axes):
    length = 1000
    origin_plane = rg.Plane.WorldXY
    members = []
    
    for axis in axes:
        member = nopa.Member(origin_plane, length)
        member.from_axis(axis)
        members.append(member)
    
    for i in range(len(members)):
        for j in range(len(members)):
            if i != j:
                members[i].intersect(members[j])
    
    for member in members:
        member.draw()