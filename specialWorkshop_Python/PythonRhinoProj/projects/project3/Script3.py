import rhinoscriptsyntax as rs
import Rhino.Geometry as rg
import day3_4 as fs

woodHeight = 0
defWoodHeight = 35
angle = 4
dAngle = 4
layers = 60

length = 1000
origin_plane = rg.Plane.WorldXY

lines = []
objs = rs.GetObjects("select object")
points = []

for i in range(len(objs)):
    ps = rs.DivideCurve(objs[i], 2)
    for j in range(len(ps)):
        ps[j][2] = 0
    points.append([ps[0], ps[2], ps[1]])
    lines.append(objs[i])
woodHeight += defWoodHeight
center = [(points[0][2][0] + points[1][2][0])/2, (points[0][2][1] + points[1][2][1])/2, 0]

for n in range(layers):
    for i in range(len(points)):
        line = rs.AddLine(points[i][0], points[i][1])
        rs.MoveObject(line,[0,0,woodHeight])
        rs.RotateObject(line, center, angle, rg.Vector3d(0,0,1))
        lines.append(line)        
    angle += dAngle
    woodHeight += defWoodHeight
    

fs.createMembers(lines)