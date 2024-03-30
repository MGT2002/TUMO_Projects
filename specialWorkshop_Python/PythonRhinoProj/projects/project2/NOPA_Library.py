import Rhino.Geometry as rg
import rhinoscriptsyntax as rs
import math as m
import scriptcontext

def mesh_add_rg_pt(mesh, pt):
    mesh.Vertices.Add(pt[0], pt[1], pt[2])


def draw_frame(plane, scale = 10, color = False):
    x_line = rg.Line(plane.Origin, plane.Origin + plane.XAxis * scale)
    y_line = rg.Line(plane.Origin, plane.Origin + plane.YAxis * scale)
    z_line = rg.Line(plane.Origin, plane.Origin + plane.ZAxis * scale)
    x_line_id = scriptcontext.doc.Objects.AddLine(x_line)
    y_line_id = scriptcontext.doc.Objects.AddLine(y_line)
    z_line_id = scriptcontext.doc.Objects.AddLine(z_line)
    
    if color:
        rs.ObjectColor(x_line_id, [255,0,0])
        rs.ObjectColor(y_line_id, [0,255,0])
        rs.ObjectColor(z_line_id, [0,0,255])


def order_axes(axes, max_height = 10000):
    axes_in_layers = []
    # Create sublists in axes_in_layers
    [axes_in_layers.append([]) for i in range(max_height)]
    # Fill axes_in_layers sublists with axes according to their height
    for axis in axes:
        axis_height = int(rs.CurveMidPoint(axis)[2])
        axes_in_layers[axis_height].append(axis)
    # Remove empty layer sublists from axes_in_layers
    axes_in_layers = filter(None, axes_in_layers)
    return axes_in_layers


def create_members_from_axes(axes):
    origin_plane = rg.Plane(rg.Point3d(0,0,0), rg.Vector3d.XAxis, rg.Vector3d.YAxis)
    length = 1000
    members = []
    for i, axis in enumerate(axes):
        member = Member(origin_plane, length)
        member.from_axis(axis)
        members.append(member)
    return members


def create_joints(members_in_layers):
    total_members = 0
    for n, members in enumerate(members_in_layers):
        print "Layer ", n, " has ", len(members), " members"
        total_members += len(members)
    print "Total layers = ", len(members_in_layers)
    print "Total members = ", total_members
    
    for k in range(len(members_in_layers)-1):
        members = members_in_layers[k]
        members_up = members_in_layers[k+1]
        for member in members:
            for member_up in members_up:
                member.intersect(member_up)
                member_up.intersect(member)


def compress_layers(members_in_layers, compression):
    compressed_breps = []
    for k, members in enumerate(members_in_layers):
        compressed_breps_layer = []
        for member in members:
            brep_cut = rg.Brep.Duplicate(member.brep_cut)
            move_down = rg.Transform.Translation(0,0,-compression*k)
            brep_cut.Transform(move_down)
            compressed_breps_layer.append(brep_cut)
        compressed_breps.append(compressed_breps_layer)
    return compressed_breps


class Member:
    """
    NOPA. Basic Member class.
    
    Args:
        origin_plane (rhino plane): Plane describing origin point and orientation of the member.
        length (float, mm): Float describing length of the member.
        size (float, mm, optional): Float describing widht/height of the member. Default value is 40mm.
    
    Attributes:
        mesh (rhino mesh): Mesh representation of the member.
        c_line (rhino line): Center line representation of the member.
        pt_A, pt_B (rhino_pt): Start and end point of the center line of the member.  
    
    Methods:
        update(self): Updates center line, mesh, side lines and side planes
    
    to do:
        show point A and B (endpoints)
        different colours for different faces (numbering of sides)
        sort sides according to distance to ground
        implement different connection methods
        
        get plane at parameter/lenght of member
        create member from line
    """
    
    def __init__(self, origin_plane, length, size = 40.0, cut_in = 10.0):
        self.o_p = origin_plane
        self.l = length
        
        self.s = size
        self.h_s = self.s * 0.5
        self.cut_in = cut_in
        
        self.tolerance = scriptcontext.doc.ModelAbsoluteTolerance
        
        self.update()
    
    def update(self):
        self.update_final_plane()
        self.update_center_line()
        self.update_mesh()
        self.update_brep()
        self.update_side_planes()
        self.update_side_lines()
    
    def draw(self):
        scriptcontext.doc.Objects.AddBrep(self.brep_cut)
        
    def update_final_plane(self):
        self.f_p = rg.Plane(self.o_p)
        self.f_p.Translate(self.o_p.ZAxis * self.l)
    
    def update_center_line(self):
        self.c_line = rg.Line(self.o_p.Origin, self.o_p.Origin + self.o_p.ZAxis * self.l)
        self.pt_A = self.c_line.PointAt(0)
        self.pt_B = self.c_line.PointAt(1)
    
    def update_mesh(self):
        self.mesh = rg.Mesh()
        
        self.corner_1 = self.o_p.Origin - self.o_p.XAxis * self.h_s - self.o_p.YAxis * self.h_s
        mesh_add_rg_pt(self.mesh, self.corner_1)
        self.corner_2 = self.o_p.Origin + self.o_p.XAxis * self.h_s - self.o_p.YAxis * self.h_s
        mesh_add_rg_pt(self.mesh, self.corner_2)
        self.corner_3 = self.o_p.Origin + self.o_p.XAxis * self.h_s + self.o_p.YAxis * self.h_s
        mesh_add_rg_pt(self.mesh, self.corner_3)
        self.corner_4 = self.o_p.Origin - self.o_p.XAxis * self.h_s + self.o_p.YAxis * self.h_s
        mesh_add_rg_pt(self.mesh, self.corner_4)
        
        self.corner_5 = self.o_p.Origin - self.o_p.XAxis * self.h_s - self.o_p.YAxis * self.h_s + self.o_p.ZAxis * self.l
        mesh_add_rg_pt(self.mesh, self.corner_5)
        self.corner_6 = self.o_p.Origin + self.o_p.XAxis * self.h_s - self.o_p.YAxis * self.h_s + self.o_p.ZAxis * self.l
        mesh_add_rg_pt(self.mesh, self.corner_6)
        self.corner_7 = self.o_p.Origin + self.o_p.XAxis * self.h_s + self.o_p.YAxis * self.h_s + self.o_p.ZAxis * self.l
        mesh_add_rg_pt(self.mesh, self.corner_7)
        self.corner_8 = self.o_p.Origin - self.o_p.XAxis * self.h_s + self.o_p.YAxis * self.h_s + self.o_p.ZAxis * self.l
        mesh_add_rg_pt(self.mesh, self.corner_8)
        
        self.mesh.Faces.AddFace(3, 2, 1, 0)
        self.mesh.Faces.AddFace(0, 1, 5, 4)
        self.mesh.Faces.AddFace(1, 2, 6, 5)
        self.mesh.Faces.AddFace(2, 3, 7, 6)
        self.mesh.Faces.AddFace(3, 0, 4, 7)
        self.mesh.Faces.AddFace(4, 5, 6, 7)
        
        self.mesh.Unweld(m.radians(0.1), True)
    
    def update_brep(self):
        # This brep will be used for boolean difference with other members - to substract from
        self.brep_cut = rg.Brep.CreateFromMesh(self.mesh, True)
        # This brep will be used to cut other members - to substract with
        self.brep_cuting = rg.Brep.CreateFromMesh(self.mesh, True)
    
    def get_sorted_faces(self):
        sorted_faces = []
        for i,f in enumerate(self.mesh.Faces):
            if i > 0 and i < 5:
                temp_mesh = rg.Mesh()
                for v in f:
                    #print v
                    #print self.mesh.Vertices[v]
                    temp_mesh.Vertices.Add(self.mesh.Vertices[v])
                temp_mesh.Faces.AddFace(0,1,2,3)
                sorted_faces.append(temp_mesh)
        return sorted_faces
    
    def branch_member(self, pln_idx, param, angle, offset_A, offset_B):
        idx_pln = self.side_planes[pln_idx]
        active_side = rg.Rectangle3d(idx_pln, rg.Interval(-self.s/2, self.s/2), rg.Interval(0, self.l))
        #active_side = gh.BoundarySurfaces(active_side)
        
        idx_ln = self.side_lines[pln_idx]
        idx_pt = idx_ln.PointAt(param)
        
        param_plane = rg.Plane(idx_pln)
        param_plane.Translate(idx_pt - idx_pln.Origin)
        
        new_origin = rg.Plane(param_plane.Origin, -param_plane.ZAxis, param_plane.YAxis)
        # We substract self.cut_in/2 to get the joint cut
        new_origin.Translate(new_origin.XAxis * -(self.h_s - self.cut_in/2))
        
        R = rg.Transform.Rotation(angle, new_origin.XAxis, new_origin.Origin)
        new_origin.Transform(R)
        
        new_origin.Translate(new_origin.ZAxis * -offset_A)
        new_member = Member(new_origin, offset_A + offset_B)
        
        return active_side, new_origin, new_member
    
    def update_side_planes(self):
        self.side_plane_0 = rg.Plane(self.corner_1, self.corner_2, self.corner_5)
        self.side_plane_1 = rg.Plane(self.corner_2, self.corner_3, self.corner_6)
        self.side_plane_2 = rg.Plane(self.corner_3, self.corner_4, self.corner_7)
        self.side_plane_3 = rg.Plane(self.corner_4, self.corner_1, self.corner_8)
        
        # We substract self.cut_in/2 to get the joint cut
        self.side_plane_0.Translate(self.side_plane_0.XAxis * (self.h_s - self.cut_in/2))
        self.side_plane_1.Translate(self.side_plane_1.XAxis * (self.h_s - self.cut_in/2))
        self.side_plane_2.Translate(self.side_plane_2.XAxis * (self.h_s - self.cut_in/2))
        self.side_plane_3.Translate(self.side_plane_3.XAxis * (self.h_s - self.cut_in/2))
        
        self.side_planes = [self.side_plane_0, self.side_plane_1, self.side_plane_2, self.side_plane_3]
        
    def update_side_lines(self):
        self.side_line_0 = rg.Line(self.side_plane_0.Origin, self.side_plane_0.YAxis * self.l)
        self.side_line_1 = rg.Line(self.side_plane_1.Origin, self.side_plane_1.YAxis * self.l)
        self.side_line_2 = rg.Line(self.side_plane_2.Origin, self.side_plane_2.YAxis * self.l)
        self.side_line_3 = rg.Line(self.side_plane_3.Origin, self.side_plane_3.YAxis * self.l)
        
        self.side_lines = [self.side_line_0, self.side_line_1, self.side_line_2, self.side_line_3]
    
    def find_scissors(self, other, idx_side_self = 0, idx_side_other = 0, param_self = 0.5, ext_1_1 = 100, ext_1_2 = 100, ext_2_1 = 100, ext_2_2 = 100):
        plane_self = self.side_planes[idx_side_self]
        plane_other = other.side_planes[idx_side_other]
        self.side_line_self = self.side_lines[idx_side_self]
        self.side_line_other = other.side_lines[idx_side_other]
        
        intersect_event = rg.Intersect.Intersection.PlanePlane(plane_self, plane_other)
        
        if intersect_event[0] == True:
            self.int_line = intersect_event[1]
            self.point_on_side_line = self.side_line_self.PointAt(param_self)
            self.param_on_int_line = self.int_line.ClosestParameter(self.point_on_side_line)
            self.point_on_int_line = self.int_line.PointAt(self.param_on_int_line)
            
            self.int_line_plane = rg.Plane(self.point_on_int_line, self.int_line.Direction)
            self.param_on_other_side_line = rg.Intersect.Intersection.LinePlane(self.side_line_other, self.int_line_plane)[1]
            self.point_on_other_side_line = self.side_line_other.PointAt(self.param_on_other_side_line)
            
            
            plane_1 = rg.Plane(self.o_p)
            plane_1.Origin = rg.Point3d(self.point_on_side_line)
            temp_normal = self.point_on_int_line - self.point_on_side_line
            temp_normal.Unitize()
            R = rg.Transform.Rotation(plane_1.ZAxis, temp_normal, plane_1.Origin)
            plane_1.Transform(R)
            plane_1.Translate(plane_self.ZAxis * self.h_s)
            plane_1.Translate(self.int_line_plane.ZAxis * self.h_s)
            plane_1.Translate(-plane_1.ZAxis * ext_1_1)
            
            length_1 = self.point_on_side_line.DistanceTo(self.point_on_int_line) + ext_1_1 + ext_1_2
            scissor_member_1 = Member(plane_1, length_1)
            
            
            plane_2 = rg.Plane(other.o_p)
            plane_2.Origin = rg.Point3d(self.point_on_other_side_line)
            temp_normal = self.point_on_int_line - self.point_on_other_side_line
            temp_normal.Unitize()
            R = rg.Transform.Rotation(plane_2.ZAxis, temp_normal, plane_2.Origin)
            plane_2.Transform(R)
            plane_2.Translate(plane_other.ZAxis * other.h_s)
            plane_2.Translate(-self.int_line_plane.ZAxis * other.h_s)
            plane_2.Translate(-plane_2.ZAxis * ext_2_1)
            
            length_2 = self.point_on_other_side_line.DistanceTo(self.point_on_int_line) + ext_2_1 + ext_2_2
            scissor_member_2 = Member(plane_2, length_2)
        
        else:
            print 'No solution for scissors! Could not find intersection line'
        
        return self.int_line, self.point_on_side_line, self.point_on_int_line, self.point_on_other_side_line, scissor_member_1, scissor_member_2
        
        
    def from_axis(self, axis):
        self.axis_id = axis
        
        self.new_origin = rs.CurveStartPoint(self.axis_id)
        self.new_o_p_x_axis = rs.VectorCreate(rs.CurveStartPoint(self.axis_id), rs.CurveEndPoint(self.axis_id))
        self.new_o_p_z_axis = rg.Vector3d.ZAxis
        self.new_o_p_y_axis = rs.VectorCrossProduct(self.new_o_p_x_axis, self.new_o_p_z_axis)
        self.new_o_p_z_axis = rs.VectorCrossProduct(self.new_o_p_y_axis, self.new_o_p_x_axis)
        self.new_o_p = rg.Plane(self.new_origin, self.new_o_p_y_axis, self.new_o_p_z_axis)
        
        self.o_p = rg.Plane(self.new_o_p)
        self.l = rs.CurveLength(self.axis_id)
        
        self.update()
        
        
    def intersect(self, other):
        self.bool_result = rg.Brep.CreateBooleanDifference(self.brep_cut, other.brep_cuting, self.tolerance)
        
        if len(self.bool_result) > 0 and self.bool_result != None:
            self.brep_cut = self.bool_result[0]


