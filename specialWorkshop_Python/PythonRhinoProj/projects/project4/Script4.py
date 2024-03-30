import rhinoscriptsyntax as rs
import Rhino.Geometry as rg
import day3_4 as fs

woodHeight = 0
defWoodHeight = 35
angle = 3
dAngle = 3
layers = 45

length = 1000
origin_plane = rg.Plane.WorldXY

lines = []
objs = rs.GetObjects("select object")
points = []

for i in range(len(objs)):
    if i%4 == 1:
       woodHeight += defWoodHeight
    ps = rs.DivideCurve(objs[i], 2)
    for j in range(len(ps)):
        ps[j][2] = 0
    points.append([ps[0], ps[2], ps[1]])
    lines.append(objs[i])

for n in range(layers):
    for i in range(len(points)):
        line = rs.AddLine(points[i][0], points[i][1])
        rs.MoveObject(line,[0,0,woodHeight])
        rs.RotateObject(line, points[i][2], angle, rg.Vector3d(0,0,1))
        lines.append(line)        
        if i%4 == 1:
            woodHeight += defWoodHeight
    angle += dAngle
    if(n%10 == 0 and n!=0):
        dAngle = -dAngle
    

fs.createMembers(lines)