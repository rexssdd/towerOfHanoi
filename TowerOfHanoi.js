document.addEventListener("DOMContentLoaded", function () {
    let moves = [];
        let rods = { a: [], b: [], c: [] };
        let selectedDiskCount = 0; // Default disk count
        let speedMultiplier = 1; // Speed multiplier
        let stepCount = 0; // Step counter
        let animationStartTime = 0;
        let animationEndTime = 0;



        function setDisks(rodId, diskCount) {
            selectedDiskCount = diskCount;
            const rod = document.getElementById(rodId);
            rod.innerHTML = ''; // Clear rod
            rods.a = []; rods.b = []; rods.c = []; // Reset rods

            for (let i = diskCount - 1; i >= 0; i--) {
                const disk = document.createElement('div');
                disk.classList.add('disk');
                disk.style.bottom = `${(diskCount - 1 - i) * 20}px`;
                disk.style.width = `${150 + i * 15}px`;
                disk.style.backgroundColor = ['#d32f2f', '#f57c00', '#fbc02d', '#388e3c', '#1976d2', '#7b1fa2', '#e91e63', '#9c27b0', '#5d4037', '#0097a7', '#00796b', '#8bc34a', '#c0ca33', '#ffeb3b', '#ffc107', '#795548', '#9e9e9e', 
                '#607d8b', '#b71c1c', '#880e4f', '#4a148c', '#311b92', '#1a237e', '#0d47a1', '#01579b', '#00695c', '#004d40'][i];
                rods[rodId.slice(-1)].push(disk);
                rod.appendChild(disk);
            }
            updateMoveCount(diskCount);
        }

        function updateMoveCount(diskCount) {
            const totalMoves = (2 ** diskCount) - 1;
            document.getElementById('move-count').innerHTML = `<strong>Total Moves:</strong> ${totalMoves}`;

             const timeComplexity = `O(2^${diskCount})`;
            document.getElementById('move-ms').innerHTML = `<strong>Time complexity:</strong> ${timeComplexity}`;
        }

        function clearRodC() {
            // Clear all rods
            document.getElementById('rod-a').innerHTML = '';
            document.getElementById('rod-b').innerHTML = '';
            document.getElementById('rod-c').innerHTML = '';

            document.getElementById('moves').innerText = '';
            document.getElementById('move-count').innerText = '';
            document.getElementById('time-complexity').innerHTML = '<strong>Time complexity:</strong> 0 ';
             document.getElementById('total-time').innerHTML = '<strong>Total Time (with animation): </strong> 0 ';


            // Reset the rods state
            rods = { a: [], b: [], c: [] };
        
            // Clear the moves and reset step count
            moves = [];
            stepCount = 0;
        
            // Clear moves display
            document.getElementById('move-count').innerHTML = '<strong>Total Moves:</strong> 0';
        
            // Deselect all buttons (number of disks)
            const buttons = document.querySelectorAll('.options button');
            buttons.forEach(button => button.classList.remove('selected'));
        
            // Reset selected disk count to null
            selectedDiskCount = null;
        
            // Reset speed multiplier to default (1x)
            speedMultiplier = 1;
            document.getElementById('speed-toggle').textContent = '2x';
        
            alert('Game reset! Please select the number of disks to start.');
        }
        

        function hanoi(n, fromRod, toRod, auxRod) {
            if (n === 1) {
                moves.push([fromRod, toRod]);
                return;
            }
            hanoi(n - 1, fromRod, auxRod, toRod);
            moves.push([fromRod, toRod]);
            hanoi(n - 1, auxRod, toRod, fromRod);
        }

        
        
                 function moveDisks() {
            if (moves.length === 0) {
                // End time when last move finishes
                animationEndTime = performance.now();
                const totalTime = (animationEndTime - animationStartTime).toFixed(3);

                // Append to the existing display
                document.getElementById('total-time').innerHTML =
                    `<strong>Total Time (with animation): </strong>${totalTime} ms`;
                return;
            }

            const [from, to] = moves.shift();
            const fromRod = document.getElementById(`rod-${from}`);
            const toRod = document.getElementById(`rod-${to}`);
            const disk = rods[from].pop();

            if (disk) {
                rods[to].push(disk);
                disk.style.bottom = `${rods[to].length * 20 - 20}px`;
                toRod.appendChild(disk);
            }

            stepCount++;
            document.getElementById('moves').innerHTML += `<br>Step ${stepCount}: Move disk from ${from.toUpperCase()} to ${to.toUpperCase()}`;

            setTimeout(moveDisks, 500 / speedMultiplier);
        }

        
        
      function handleDiskSelection(button, diskCount) {
            const buttons = document.querySelectorAll('.options button');
            buttons.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
            setDisks('rod-a', diskCount);
        }

        document.getElementById('btn-3').addEventListener('click', function() {
            handleDiskSelection(this, 3);
        });
        document.getElementById('btn-7').addEventListener('click', function() {
            handleDiskSelection(this, 7);
        });
        document.getElementById('btn-9').addEventListener('click', function() {
            handleDiskSelection(this, 9);
        });

//         document.getElementById('skip').addEventListener('click', () => {
//     if (selectedDiskCount === 0) {
//         alert("Please select the number of disks first!");
//         return;
//     }

//     // Reset rods and state
//     document.getElementById('rod-a').innerHTML = '';
//     document.getElementById('rod-b').innerHTML = '';
//     document.getElementById('rod-c').innerHTML = '';
//     rods = { a: [], b: [], c: [] };
//     moves = [];
//     stepCount = 0;

//     // Recursive function to generate all Hanoi moves
//     function generateMoves(n, fromRod, toRod, auxRod) {
//         if (n === 1) {
//             moves.push([fromRod, toRod]);
//             return;
//         }
//         generateMoves(n - 1, fromRod, auxRod, toRod);
//         moves.push([fromRod, toRod]);
//         generateMoves(n - 1, auxRod, toRod, fromRod);
//     }

//     // Start timing
//     const startTime = performance.now();
//     generateMoves(selectedDiskCount, 'a', 'c', 'b');
//     const endTime = performance.now();

//     const duration = endTime - startTime; // in ms
//     const durationMicro = duration * 1000; // µs
//     const durationNano = duration * 1_000_000; // ns
//     const totalMoves = Math.pow(2, selectedDiskCount) - 1;
//     const timeComplexity = `O(2^${selectedDiskCount}-1) = ${totalMoves.toLocaleString()} moves`;

//     // Display time complexity and execution time
//     document.getElementById('time-complexity').innerHTML =
//         `<strong>Time Complexity:</strong> ${timeComplexity}<br>`;
//     document.getElementById('time-execution').innerHTML =
//         `<strong>Execution Time:</strong> ${duration.toFixed(3)} ms (${durationMicro.toFixed(0)} µs | ${durationNano.toFixed(0)} ns)`;

//     // Render all disks directly on rod C
//     const rodC = document.getElementById('rod-c');
//     for (let i = selectedDiskCount - 1; i >= 0; i--) {
//         const disk = document.createElement('div');
//         disk.classList.add('disk');
//         disk.style.bottom = `${(selectedDiskCount - 1 - i) * 20}px`;
//         disk.style.width = `${150 + i * 15}px`;
//         disk.style.backgroundColor = [
//             '#d32f2f', '#f57c00', '#fbc02d', '#388e3c', '#1976d2', '#7b1fa2',
//             '#e91e63', '#9c27b0', '#5d4037', '#0097a7', '#00796b', '#8bc34a',
//             '#c0ca33', '#ffeb3b', '#ffc107', '#795548', '#9e9e9e', '#607d8b',
//             '#b71c1c', '#880e4f', '#4a148c', '#311b92', '#1a237e', '#0d47a1',
//             '#01579b', '#00695c', '#004d40'
//         ][i];
//         rods.c.push(disk);
//         rodC.appendChild(disk);
//     }

//     // Display the move list
//     const movesList = moves.map((move, index) =>
//         `Step ${index + 1}: Move disk from ${move[0].toUpperCase()} to ${move[1].toUpperCase()}`
//     ).join('<br>');

//     document.getElementById('moves').innerHTML = `<br>${movesList}`;
//     document.getElementById('move-count').innerHTML =
//         `<strong>Total Moves:</strong> ${moves.length}`;
// });

        
        
      document.getElementById('start').addEventListener('click', () => {
    const rodC = document.getElementById('rod-c');
    const rodCDisks = rodC.children.length;

    // Check if number of disks is selected
    if (selectedDiskCount === 0 || selectedDiskCount === null) {
        alert('Please select the number of disks first!');
        return;
    }

    // Check if Rod C is not empty
    if (rodCDisks > 0) {
        alert('Error: Rod C is not empty. Please click "Clear" before starting a new game.');
        return;
    }

    // Reset moves and step count
    moves = [];
    stepCount = 0;
    document.getElementById('moves').innerHTML = ''; // Clear moves display

    // Start timing the hanoi() algorithm execution
    const startTime = performance.now();

    // Run the algorithm
    hanoi(selectedDiskCount, 'a', 'c', 'b');

    // End timing immediately after algorithm completes
    const endTime = performance.now();

    // Calculate duration in ms
    const duration = endTime - startTime;

    // Theoretical total moves for Tower of Hanoi: 2^n - 1
    const totalMoves = Math.pow(2, selectedDiskCount) - 1;

    // Calculate and display time complexity with execution time
    const timeComplexity = `O(2^${selectedDiskCount}-1) = ${totalMoves.toLocaleString()} moves`;
    const executionTime = `${duration.toFixed(3)} ms`;

    // Show both values
    document.getElementById('time-complexity').innerHTML =
        `<strong>Time Complexity:</strong> ${timeComplexity}<br>Execution Time: ${executionTime}`;

    // Start animating the moves
    moveDisks();
});



    

    document.getElementById('speed-toggle').addEventListener('click', () => {
        speedMultiplier = 2;
        updateSpeedButtons();
    });

    document.getElementById('speed-toggle4x').addEventListener('click', () => {
        speedMultiplier = 4;
        updateSpeedButtons();
    });

    document.getElementById('speed-toggle6x').addEventListener('click', () => {
        speedMultiplier = 6;
        updateSpeedButtons();
    });

    function updateSpeedButtons() {
        document.getElementById('speed-toggle').innerText = '2x';
        document.getElementById('speed-toggle4x').innerText = '4x';
        document.getElementById('speed-toggle6x').innerText = '6x';

        // Optionally highlight the active one (add styling here if needed)
        console.log(`Speed set to ${speedMultiplier}x`);
    }

        document.getElementById('clear').addEventListener('click', clearRodC);
});