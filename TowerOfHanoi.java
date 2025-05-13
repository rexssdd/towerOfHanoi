import java.util.Stack;

public class TowerOfHanoi {

    @SuppressWarnings("unchecked")
    public static void solveHanoi(int n, char fromRod, char toRod, char auxRod) {
        long startTime = System.nanoTime(); // Start time

        int totalMoves = (int) Math.pow(2, n) - 1;
        char[] rods = {fromRod, toRod, auxRod};

        if (n % 2 == 0) {
            char temp = toRod;
            toRod = auxRod;
            auxRod = temp;
        }

        Stack<Integer>[] towers = new Stack[3];
        for (int i = 0; i < 3; i++) {
            towers[i] = new Stack<>();
        }

        for (int i = n; i >= 1; i--) {
            towers[0].push(i);
        }

        for (int i = 1; i <= totalMoves; i++) {
            int from = (i & i - 1) % 3;
            int to = ((i | i - 1) + 1) % 3;

            if (!moveDisk(towers[from], towers[to], rods[from], rods[to])) {
                moveDisk(towers[to], towers[from], rods[to], rods[from]);
            }
        }

        long endTime = System.nanoTime(); // End time
        System.out.println("Time taken: " + (endTime - startTime)/1_000_000.0 + " ms");
    }

    private static boolean moveDisk(Stack<Integer> fromTower, Stack<Integer> toTower, char from, char to) {
        if (!fromTower.isEmpty() && (toTower.isEmpty() || fromTower.peek() < toTower.peek())) {
            toTower.push(fromTower.pop());
            System.out.println("Move disk from " + from + " to " + to);
            return true;
        }
        return false;
    }

    public static void main(String[] args) {
        int n = 3; // Number of disks
        solveHanoi(n, 'A', 'C', 'B');
    }
}
