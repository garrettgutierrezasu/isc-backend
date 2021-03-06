package algorithm;

class Wall {
	private Point startPoint, endPoint;
	
	Wall(Point p1, Point p2){
		startPoint = p1;
		endPoint = p2;
	}
	
	Wall(double x1, double y1, double x2, double y2){
		startPoint = new Point(x1,y1);
		endPoint = new Point(x2,y2);
	}
	
	void setFirstPoint(Point p){
		startPoint = p;
	}
	
	void setSecondPoint(Point p){
		endPoint = p;
	}
	
	Point getFirstPoint(){
		return startPoint;
	}
	
	Point getSecondPoint(){
		return endPoint;
	}
		
	//Returns true if the wall is in between the two clusters. False otherwise.
	boolean betweenClusters(Cluster c1, Cluster c2){
		double x1 = c1.getMiddle().getX();
		double y1 = c1.getMiddle().getY();
		double x2 = c2.getMiddle().getX();
		double y2 = c2.getMiddle().getY();
		double wallx1 = startPoint.getX();
		double wally1 = startPoint.getY();
		double wallx2 = endPoint.getX();
		double wally2 = endPoint.getY();
		double seg1X, seg1Y, wallSegX, wallSegY;
		
		seg1X = x2 - x1;     
		seg1Y = y2 - y1;
		wallSegX = wallx2 - wallx1;     
		wallSegY = wally2 - wally1;

		double s, t;
		s = (-seg1Y * (x1 - wallx1) + seg1X * (y1 - wally1)) / (-wallSegX * seg1Y + seg1X * wallSegY);
		t = ( wallSegX * (y1 - wally1) - wallSegY * (x1 - wallx1)) / (-wallSegX * seg1Y + seg1X * wallSegY);

		if (s >= 0 && s <= 1 && t >= 0 && t <= 1){
			// Intersection detected
			return true;
		}

		return false; // No intersection
	}
	
	boolean horizontal(){
		if(startPoint.getX() == endPoint.getX()){
			return true;
		}
		return false;
	}
	
	boolean betweenClusters(Cluster c1, Point p1){
		double x1 = c1.getMiddle().getX();
		double y1 = c1.getMiddle().getY();
		double x2 = p1.getX();
		double y2 = p1.getY();
		double wallx1 = startPoint.getX();
		double wally1 = startPoint.getY();
		double wallx2 = endPoint.getX();
		double wally2 = endPoint.getY();
		double seg1X, seg1Y, wallSegX, wallSegY;
		
		seg1X = x2 - x1;     
		seg1Y = y2 - y1;
		wallSegX = wallx2 - wallx1;     
		wallSegY = wally2 - wally1;

		double s, t;
		s = (-seg1Y * (x1 - wallx1) + seg1X * (y1 - wally1)) / (-wallSegX * seg1Y + seg1X * wallSegY);
		t = ( wallSegX * (y1 - wally1) - wallSegY * (x1 - wallx1)) / (-wallSegX * seg1Y + seg1X * wallSegY);

		if (s >= 0 && s <= 1 && t >= 0 && t <= 1){
			// Intersection detected
			return true;
		}

		return false; // No intersection
	}
}
