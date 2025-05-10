public class TowerOfHanoi {

    public static void solveHanoi(int n, String source, String destination, String auxiliary) {
        if (n == 1) {
            System.out.println("Move disk 1 from " + source + " to " + destination);
            return;
        }
        solveHanoi(n - 1, source, auxiliary, destination);
        System.out.println("Move disk " + n + " from " + source + " to " + destination);
        solveHanoi(n - 1, auxiliary, destination, source);
    }

    public static void main(String[] args) {
        int n = 3;  // Number of Disks

        long startTime = System.currentTimeMillis(); // Start time

        solveHanoi(n, "A", "C", "B");

        long endTime = System.currentTimeMillis();   // End time
        long executionTime = endTime - startTime;

        System.out.println("Execution time: " + executionTime + " ms");
    }
}
